# Setup Guide - Course Badge Platform with Gemini API

## Prerequisites
- Node.js installed
- Google Gemini API key

## Step 1: Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Configure Environment

1. Open the `.env` file in the root directory
2. Replace `your_gemini_api_key_here` with your actual API key:

```
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

## Step 3: Install Dependencies

```cmd
npm install
```

## Step 4: Run the Application

```cmd
npm run dev
```

The application will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Features

### External Course Integration
- Fetches real courses from Coursera, Udemy, GeeksforGeeks, edX, Udacity
- Uses Gemini AI to get current course information
- Displays detailed course information including:
  - Duration and weekly commitment
  - Price and ratings
  - Instructor information
  - Skills learned
  - Assignments and projects
  - Why choose this course

### Course Categories
- Web Development
- Data Science
- Machine Learning
- Mobile Development
- Cloud Computing
- Cybersecurity

### How It Works
1. User clicks "Explore Courses"
2. Select a category or view all courses
3. Gemini API fetches real courses from external platforms
4. Click "View Details" to see complete course information
5. Click "Enroll Now" to be redirected to the platform

## Troubleshooting

### API Key Issues
- Make sure your API key is correctly set in `.env`
- Restart the server after updating `.env`

### No Courses Loading
- Check your internet connection
- Verify API key is valid
- Check console for error messages

### Rate Limiting
- Gemini API has rate limits
- If you hit limits, wait a few minutes before trying again

## Notes
- The first load may take 10-20 seconds as Gemini generates course data
- Course information is fetched fresh each time for up-to-date data
- External course links redirect to actual platform websites
