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

## Project Structure

```
training-video/
├── netlify/
│   └── functions/
│       └── upload.js          # Serverless function for file upload
├── public/
│   └── index.html             # Web interface
├── src/
│   └── utils/
│       ├── documentParser.js  # Document text extraction
│       ├── textSummarizer.js  # Text summarization logic
│       └── videoGenerator.js  # Slide/video generation
├── netlify.toml               # Netlify configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Deployment to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration from `netlify.toml`
4. Deploy!

Alternatively, deploy using Netlify CLI:

```bash
netlify deploy --prod
```

## API Endpoints

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

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
