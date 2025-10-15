# Deployment Guide

This guide covers deploying the Training Video Generator to Netlify.

## Prerequisites

- A GitHub account
- A Netlify account (free tier works fine)
- Your repository pushed to GitHub

## Option 1: Deploy via Netlify UI (Recommended for beginners)

1. **Connect to Netlify**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your repositories

2. **Configure Build Settings**
   - Select your repository: `jordan77-lang/training-video`
   - Build settings (should auto-detect from `netlify.toml`):
     - Build command: `npm run build`
     - Publish directory: `public`
     - Functions directory: `netlify/functions`

3. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at a URL like `https://random-name.netlify.app`

4. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Follow DNS configuration instructions

## Option 2: Deploy via Netlify CLI

### Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Login to Netlify

```bash
netlify login
```

### Initialize Site

```bash
netlify init
```

Follow the prompts to:
- Create a new site or link to an existing one
- Configure build settings
- Set environment variables (if any)

### Deploy

```bash
# Deploy to draft URL for testing
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Environment Variables

If you need to set environment variables (e.g., for AI API keys):

### Via Netlify UI

1. Go to Site settings → Environment variables
2. Add your variables:
   - `OPENAI_API_KEY` (optional, for AI integration)
   - Any other configuration values

### Via Netlify CLI

```bash
netlify env:set OPENAI_API_KEY "your-key-here"
```

## Build Configuration

The build is configured in `netlify.toml`:

```toml
[build]
  functions = "netlify/functions"
  publish = "public"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[functions]
  node_bundler = "esbuild"
```

## Function Limits

Be aware of Netlify's function limits on the free tier:

- **Execution time**: 10 seconds per function
- **Size limit**: 50MB zipped, 250MB unzipped
- **Invocations**: 125,000/month

For larger files or more processing, consider upgrading to a paid plan.

## Troubleshooting

### Build Fails

- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Function Timeout

- Large files may exceed the 10-second limit
- Consider splitting into multiple function calls
- Optimize document processing

### Module Not Found Errors

- Ensure dependencies are listed in `dependencies`, not `devDependencies`
- Run `npm install` locally to verify

## Monitoring

Monitor your deployment:

- **Build logs**: Check for errors during deployment
- **Function logs**: View real-time function execution logs
- **Analytics**: Track usage and performance

## Updating Your Deployment

Any push to your main branch will trigger a new deployment automatically.

To deploy a different branch:

```bash
netlify deploy --prod --branch your-branch-name
```

## Rollback

If something goes wrong:

1. Go to Deploys in Netlify dashboard
2. Find a previous successful deploy
3. Click "Publish deploy" to rollback

## Support

For issues specific to Netlify:
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)
