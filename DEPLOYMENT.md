# Deployment Guide for Career Path Finder

This guide provides detailed instructions for deploying the Career Path Finder application to Netlify.

## Prerequisites

- A GitHub account
- A Netlify account
- Your Supabase project set up with the necessary tables and authentication

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already, push your code to GitHub:

1. Create a new repository on GitHub
2. Initialize Git in your project folder (if not already done):
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add your GitHub repository as a remote:
   ```
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```
4. Push your code:
   ```
   git push -u origin main
   ```

### 2. Deploy to Netlify

#### Option 1: Deploy via Netlify UI

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Show advanced" and add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key (if using the chatbot)
8. Click "Deploy site"

#### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```
   npm install netlify-cli -g
   ```
2. Log in to Netlify:
   ```
   netlify login
   ```
3. Initialize your site:
   ```
   netlify init
   ```
4. Follow the prompts to create a new site or link to an existing one
5. Deploy your site:
   ```
   netlify deploy --prod
   ```

### 3. Verify Your Deployment

1. Once deployment is complete, Netlify will provide you with a URL
2. Visit the URL to ensure your site is working correctly
3. Test key functionality:
   - User authentication
   - Career assessments
   - Profile creation
   - Career exploration

### 4. Set Up Custom Domain (Optional)

1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to set up your domain

### 5. Enable HTTPS (Optional)

Netlify automatically provisions SSL certificates for custom domains. To enable:

1. Go to "Domain settings"
2. Under "HTTPS", click "Verify DNS configuration"
3. Once verified, Netlify will provision an SSL certificate

## Troubleshooting

### Images Not Loading

If images aren't loading, check:
- The `next.config.js` file has the correct image domains configured
- The `unoptimized: true` option is set in the images configuration
- The image paths are correct

### API Routes Not Working

If API routes aren't working:
- Check that the Netlify redirects are properly configured in the `netlify.toml` file
- Verify your environment variables are correctly set in Netlify

### Build Failures

If your build fails:
- Check the build logs in Netlify
- Ensure all dependencies are correctly listed in `package.json`
- Verify that your Next.js version is compatible with the Netlify Next.js plugin

## Continuous Deployment

Netlify automatically rebuilds and redeploys your site when you push changes to your GitHub repository. To disable this:

1. Go to "Site settings" > "Build & deploy" > "Continuous deployment"
2. Toggle "Stop builds" to disable automatic deployments

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
- [Supabase Documentation](https://supabase.io/docs)
