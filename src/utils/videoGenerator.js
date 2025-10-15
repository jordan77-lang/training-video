const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

/**
 * Generate a single frame/slide with text
 */
function generateSlide(text, index, totalSlides, width = 1280, height = 720) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Title area
  ctx.fillStyle = '#0f3460';
  ctx.fillRect(0, 0, width, 100);
  
  // Title text
  ctx.fillStyle = '#eaeaea';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Mission Training', width / 2, 60);
  
  // Slide number
  ctx.fillStyle = '#999';
  ctx.font = '20px Arial';
  ctx.fillText(`${index + 1} / ${totalSlides}`, width - 80, 60);
  
  // Main content
  ctx.fillStyle = '#eaeaea';
  ctx.font = '28px Arial';
  ctx.textAlign = 'left';
  
  // Word wrap the text
  const maxWidth = width - 160;
  const lineHeight = 40;
  const words = text.split(' ');
  let line = '';
  let y = 180;
  
  for (let word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, 80, y);
      line = word + ' ';
      y += lineHeight;
      
      // Prevent overflow
      if (y > height - 100) break;
    } else {
      line = testLine;
    }
  }
  
  // Draw remaining text
  if (line && y < height - 100) {
    ctx.fillText(line, 80, y);
  }
  
  return canvas.toBuffer('image/png');
}

/**
 * Generate video from text slides
 */
async function generateVideo(keyPoints, outputPath, duration = 3) {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(__dirname, '../../tmp/slides');
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    try {
      // Generate slides
      const slideFiles = [];
      keyPoints.forEach((point, index) => {
        const slideBuffer = generateSlide(point, index, keyPoints.length);
        const slidePath = path.join(tempDir, `slide_${index}.png`);
        fs.writeFileSync(slidePath, slideBuffer);
        slideFiles.push(slidePath);
      });
      
      // Create video from slides using ffmpeg
      const command = ffmpeg();
      
      slideFiles.forEach((file) => {
        command.input(file).inputOptions([`-loop 1`, `-t ${duration}`]);
      });
      
      command
        .complexFilter([
          slideFiles.map((_, i) => `[${i}:v]`).join('') + `concat=n=${slideFiles.length}:v=1:a=0[outv]`
        ])
        .outputOptions(['-map [outv]', '-pix_fmt yuv420p'])
        .output(outputPath)
        .on('end', () => {
          // Cleanup temp files
          slideFiles.forEach(file => {
            try {
              fs.unlinkSync(file);
            } catch (err) {
              console.error(`Failed to delete temp file: ${file}`, err);
            }
          });
          resolve(outputPath);
        })
        .on('error', (err) => {
          reject(new Error(`Video generation failed: ${err.message}`));
        })
        .run();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Generate simple slide images (fallback if ffmpeg not available)
 */
async function generateSlides(keyPoints, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const slideFiles = [];
  
  keyPoints.forEach((point, index) => {
    const slideBuffer = generateSlide(point, index, keyPoints.length);
    const slidePath = path.join(outputDir, `slide_${index + 1}.png`);
    fs.writeFileSync(slidePath, slideBuffer);
    slideFiles.push(slidePath);
  });
  
  return slideFiles;
}

module.exports = {
  generateVideo,
  generateSlides,
  generateSlide
};
