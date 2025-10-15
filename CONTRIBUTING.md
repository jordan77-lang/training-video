# Contributing to Training Video Generator

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/training-video.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 14.0.0 or higher
- npm or yarn
- Git

### Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at `http://localhost:8888`

## Making Changes

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns

### Testing

Before submitting a pull request:

1. Test your changes locally
2. Run `npm test` to ensure tests pass
3. Verify the build works: `npm run build`

### Commit Messages

Use clear and descriptive commit messages:

```
Add feature: Brief description of what you added
Fix: Brief description of what you fixed
Update: Brief description of what you updated
```

## Submitting Changes

1. Commit your changes: `git commit -m "Add feature: your feature description"`
2. Push to your fork: `git push origin feature/your-feature-name`
3. Open a Pull Request with a clear description of your changes

## Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Ensure all tests pass
- Update documentation if needed
- Add screenshots for UI changes

## Areas for Contribution

### High Priority

- Integration with AI APIs (OpenAI, Claude, etc.) for better summarization
- Video export with transitions and effects
- Audio narration generation
- Custom slide templates

### Medium Priority

- Batch processing support
- More document format support
- Advanced text analysis
- User authentication

### Documentation

- Improve README
- Add code examples
- Write tutorials
- Create video demos

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- General discussions

## License

By contributing, you agree that your contributions will be licensed under the same ISC License that covers the project.
