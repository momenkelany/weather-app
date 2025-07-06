# GitHub Pages Deployment Guide

This guide will help you deploy your styled weather app to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your local machine
3. The weather app project files

## Step-by-Step Deployment Instructions

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "weather-app")
4. Make sure it's set to "Public" (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (since we already have files)
6. Click "Create repository"

### 2. Initialize Git and Connect to GitHub

Open your terminal in the project directory and run these commands:

```bash
# Initialize git repository
git init

# Add all files to git
git add .

# Make your first commit
git commit -m "Initial commit: Styled weather app"

# Add your GitHub repository as origin (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/weather-app.git

# Push to GitHub
git push -u origin main
```

### 3. Update Package.json Homepage

Before deploying, update the `homepage` field in `package.json`:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/weather-app"
}
```

Replace `YOUR_USERNAME` with your actual GitHub username and `weather-app` with your repository name.

### 4. Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This command will:
- Build your React app for production
- Create a `gh-pages` branch
- Push the built files to the `gh-pages` branch

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch and "/ (root)" folder
6. Click "Save"

### 6. Access Your Deployed App

After a few minutes, your app will be available at:
```
https://YOUR_USERNAME.github.io/weather-app
```

## Important Notes

### API Configuration

The weather app currently tries to connect to a backend server at `http://localhost:5000`. For a production deployment, you'll need to either:

1. **Deploy a backend server** and update the API URLs in the React app
2. **Use a direct API approach** by modifying the app to call weather APIs directly from the frontend
3. **Use a serverless function** (like Vercel Functions or Netlify Functions)

### Environment Variables

If you're using API keys, make sure to:
1. Create a `.env` file with your API keys (already included in the project)
2. Add `.env` to your `.gitignore` file to keep API keys secure
3. Set up environment variables in your deployment platform

### Updating Your Deployment

To update your deployed app after making changes:

```bash
# Make your changes
# Commit your changes
git add .
git commit -m "Update: description of changes"
git push origin main

# Deploy the updates
npm run deploy
```

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure the `homepage` field in `package.json` matches your GitHub Pages URL
2. **Blank Page**: Check the browser console for errors, often related to incorrect paths
3. **API Errors**: The app needs a backend server or direct API integration to function fully

### GitHub Pages Limitations

- Only serves static files (HTML, CSS, JS)
- Cannot run server-side code
- Free tier requires public repositories
- Custom domains available with proper DNS configuration

## Next Steps

1. Set up a backend API service (recommended: Vercel, Netlify, or Heroku)
2. Update API endpoints in the React app
3. Configure environment variables for production
4. Set up a custom domain (optional)

Your styled weather app is now ready for deployment to GitHub Pages!

