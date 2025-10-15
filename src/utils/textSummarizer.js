/**
 * Summarize text into key points for video generation
 * This is a simple extractive summarization approach
 * For production, you would integrate with OpenAI or similar AI service
 */
function summarizeText(text, maxPoints = 5) {
  // Clean and normalize text
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  if (!cleanText) {
    throw new Error('Text is empty');
  }
  
  // Split into sentences
  const sentences = cleanText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20); // Filter out very short sentences
  
  if (sentences.length === 0) {
    return ['No meaningful content found'];
  }
  
  // For a simple approach, take evenly distributed sentences
  const step = Math.ceil(sentences.length / maxPoints);
  const keyPoints = [];
  
  for (let i = 0; i < sentences.length && keyPoints.length < maxPoints; i += step) {
    keyPoints.push(sentences[i]);
  }
  
  return keyPoints;
}

/**
 * Extract key topics/headings from text
 */
function extractTopics(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const topics = [];
  
  for (const line of lines) {
    // Simple heuristic: short lines (potential headings) that are all caps or title case
    if (line.length < 100 && line.length > 3) {
      const isAllCaps = line === line.toUpperCase();
      const startsWithCapital = /^[A-Z]/.test(line);
      
      if (isAllCaps || startsWithCapital) {
        topics.push(line);
      }
    }
  }
  
  return topics.slice(0, 10); // Return max 10 topics
}

module.exports = {
  summarizeText,
  extractTopics
};
