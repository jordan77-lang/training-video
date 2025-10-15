const pdf = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract text from PDF buffer
 */
async function parsePDF(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Extract text from DOCX buffer
 */
async function parseDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    throw new Error(`Failed to parse DOCX: ${error.message}`);
  }
}

/**
 * Parse document based on file type
 */
async function parseDocument(buffer, fileType) {
  const normalizedType = fileType.toLowerCase();
  
  if (normalizedType === 'pdf' || normalizedType === 'application/pdf') {
    return await parsePDF(buffer);
  } else if (normalizedType === 'docx' || normalizedType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await parseDOCX(buffer);
  } else if (normalizedType === 'txt' || normalizedType === 'text/plain') {
    return buffer.toString('utf-8');
  } else {
    throw new Error(`Unsupported file type: ${fileType}`);
  }
}

module.exports = {
  parseDocument,
  parsePDF,
  parseDOCX
};
