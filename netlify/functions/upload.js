const { parseDocument } = require('../../src/utils/documentParser');
const { summarizeText } = require('../../src/utils/textSummarizer');
const { generateSlides } = require('../../src/utils/videoGenerator');
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

/**
 * Parse multipart form data
 */
function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ 
      headers: {
        ...event.headers,
        'content-type': event.headers['content-type'] || event.headers['Content-Type']
      }
    });
    
    const result = {
      files: [],
      fields: {}
    };
    
    busboy.on('file', (fieldname, file, info) => {
      const { filename, encoding, mimeType } = info;
      const chunks = [];
      
      file.on('data', (data) => {
        chunks.push(data);
      });
      
      file.on('end', () => {
        result.files.push({
          fieldname,
          filename,
          encoding,
          mimeType,
          buffer: Buffer.concat(chunks)
        });
      });
    });
    
    busboy.on('field', (fieldname, value) => {
      result.fields[fieldname] = value;
    });
    
    busboy.on('finish', () => {
      resolve(result);
    });
    
    busboy.on('error', (error) => {
      reject(error);
    });
    
    const encoding = event.isBase64Encoded ? 'base64' : 'binary';
    busboy.write(event.body, encoding);
    busboy.end();
  });
}

/**
 * Netlify Function Handler
 */
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Parse the uploaded file
    const formData = await parseMultipartForm(event);
    
    if (!formData.files || formData.files.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file uploaded' })
      };
    }
    
    const file = formData.files[0];
    const fileExt = path.extname(file.filename).slice(1);
    
    // Parse document
    const text = await parseDocument(file.buffer, fileExt);
    
    if (!text || text.trim().length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No text content found in document' })
      };
    }
    
    // Summarize text into key points
    const maxPoints = parseInt(formData.fields.maxPoints || '5', 10);
    const keyPoints = summarizeText(text, maxPoints);
    
    // Generate slides
    const outputDir = '/tmp/output';
    const slideFiles = await generateSlides(keyPoints, outputDir);
    
    // Read slides as base64 for response
    const slides = slideFiles.map((file, index) => {
      const imageBuffer = fs.readFileSync(file);
      const base64Image = imageBuffer.toString('base64');
      
      // Clean up temp file
      try {
        fs.unlinkSync(file);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
      
      return {
        index: index + 1,
        text: keyPoints[index],
        image: `data:image/png;base64,${base64Image}`
      };
    });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Document processed successfully',
        originalFilename: file.filename,
        textLength: text.length,
        keyPoints,
        slides,
        totalSlides: slides.length
      })
    };
    
  } catch (error) {
    console.error('Error processing upload:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to process document',
        details: error.message 
      })
    };
  }
};
