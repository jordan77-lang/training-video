# 🎥 Training Video Generator

A Node.js + Netlify-compatible application that converts uploaded mission training documents into short AI-generated video slides.

## Features

- 📄 **Document Upload**: Support for PDF, DOCX, and TXT files
- 🤖 **AI Text Summarization**: Automatically extracts key points from documents
- 🎨 **Slide Generation**: Creates professional video slides with custom styling
- ⚡ **Serverless Architecture**: Built on Netlify Functions for scalability
- 🎯 **Simple Interface**: Easy-to-use web interface for document upload

## Technology Stack

- **Backend**: Node.js with Netlify Functions
- **Document Processing**: pdf-parse, mammoth
- **Image Generation**: node-canvas
- **Video Generation**: fluent-ffmpeg (optional)
- **Frontend**: Vanilla HTML/CSS/JavaScript

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jordan77-lang/training-video.git
cd training-video
```

2. Install dependencies:
```bash
npm install
```

## Local Development

Run the project locally using Netlify Dev:

```bash
npm run dev
```

This will start a local server at `http://localhost:8888`

## Usage

1. Open the web interface
2. Upload a training document (PDF, DOCX, or TXT)
3. Set the maximum number of slides (3-10)
4. Click "Generate Video Slides"
5. View and download the generated slides

### Example Files

A sample training document is provided in the `examples/` directory for testing:
- `examples/sample-training.txt` - Space Operations Protocol training document

## Architecture

```
┌─────────────────┐
│   Web Browser   │
│  (Frontend UI)  │
└────────┬────────┘
         │ HTTP POST
         │ (Multipart Form Data)
         ▼
┌─────────────────────────────┐
│   Netlify Function          │
│   /api/upload               │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Document Parser           │
│   - PDF (pdf-parse)         │
│   - DOCX (mammoth)          │
│   - TXT (native)            │
└────────┬────────────────────┘
         │ Raw Text
         ▼
┌─────────────────────────────┐
│   Text Summarizer           │
│   - Extract key points      │
│   - Identify main topics    │
└────────┬────────────────────┘
         │ Key Points Array
         ▼
┌─────────────────────────────┐
│   Slide Generator           │
│   - Canvas rendering        │
│   - 1280x720 PNG output     │
└────────┬────────────────────┘
         │ Base64 Images
         ▼
┌─────────────────────────────┐
│   JSON Response             │
│   - Slides with images      │
│   - Metadata                │
└─────────────────────────────┘
```

## Project Structure

```
training-video/
├── netlify/
│   └── functions/
│       ├── upload.js          # Serverless function for file upload
│       └── health.js          # Health check endpoint
├── public/
│   ├── index.html             # Main web interface
│   └── status.html            # System status page
├── src/
│   └── utils/
│       ├── documentParser.js  # Document text extraction
│       ├── textSummarizer.js  # Text summarization logic
│       └── videoGenerator.js  # Slide/video generation
├── examples/
│   └── sample-training.txt    # Sample training document
├── netlify.toml               # Netlify configuration
├── package.json               # Dependencies and scripts
├── DEPLOYMENT.md              # Deployment guide
├── CONTRIBUTING.md            # Contribution guidelines
└── README.md                  # This file
```

## Deployment to Netlify

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick start:**

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration from `netlify.toml`
4. Deploy!

Alternatively, deploy using Netlify CLI:

```bash
netlify deploy --prod
```

## API Endpoints

### GET /api/health

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "service": "training-video-generator",
  "version": "1.0.0",
  "timestamp": "2025-10-15T21:30:00.000Z",
  "features": {
    "documentParsing": ["pdf", "docx", "txt"],
    "slideGeneration": true,
    "maxSlides": 10
  }
}
```

### POST /api/upload

Upload and process a training document.

**Request:**
- Content-Type: multipart/form-data
- Body:
  - `file`: Document file (PDF, DOCX, or TXT)
  - `maxPoints`: Maximum number of slides (default: 5)

**Response:**
```json
{
  "success": true,
  "message": "Document processed successfully",
  "originalFilename": "training.pdf",
  "textLength": 1234,
  "keyPoints": ["Point 1", "Point 2", "..."],
  "slides": [
    {
      "index": 1,
      "text": "Key point text",
      "image": "data:image/png;base64,..."
    }
  ],
  "totalSlides": 5
}
```

## Supported File Formats

- **PDF** (.pdf)
- **Word Documents** (.docx)
- **Plain Text** (.txt)

## Configuration

The project uses the following default settings:

- **Maximum Slides**: 5 (configurable 3-10)
- **Slide Duration**: 3 seconds per slide (for video generation)
- **Slide Resolution**: 1280x720 pixels
- **Color Scheme**: Dark blue gradient background

## Limitations

- File size limits depend on Netlify's function limits (typically 10MB)
- Video generation requires ffmpeg (slides are generated as images by default)
- Text summarization uses a simple extractive approach (can be enhanced with AI APIs)

## Future Enhancements

- [ ] Integration with OpenAI GPT for advanced summarization
- [ ] Audio narration generation
- [ ] Custom slide templates
- [ ] Video export with transitions
- [ ] Batch processing support

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

ISC
