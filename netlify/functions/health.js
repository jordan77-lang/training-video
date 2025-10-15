/**
 * Health check endpoint for monitoring
 */
exports.handler = async () => {
  const maxSlides = parseInt(process.env.MAX_SLIDES || '10', 10);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'healthy',
      service: 'training-video-generator',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      features: {
        documentParsing: ['pdf', 'docx', 'txt'],
        slideGeneration: true,
        maxSlides: maxSlides
      }
    })
  };
};
