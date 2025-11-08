# Frontend Heroku Deployment Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variable**
   ```bash
   # For local development, create .env file:
   echo "REACT_APP_API_URL=http://localhost:3000" > .env
   
   # For Heroku:
   heroku config:set REACT_APP_API_URL=https://your-backend-app.herokuapp.com
   ```

3. **Deploy to Heroku**
   ```bash
   heroku create your-app-name-frontend
   git push heroku master
   ```

## Environment Variables

- `REACT_APP_API_URL` - Your backend API URL
  - Development: `http://localhost:3000`
  - Production: `https://your-backend-app.herokuapp.com`

## Build Process

The Procfile will:
1. Build the React app (`npm run build`)
2. Serve the built files using `serve` package
3. Use the PORT environment variable provided by Heroku

## Troubleshooting

- **Build fails**: Check that all dependencies are in package.json
- **API calls fail**: Verify REACT_APP_API_URL is set correctly
- **CORS errors**: Ensure backend CORS is configured for your frontend URL

