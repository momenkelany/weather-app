# Weather Forecasting Web Application

A web-based application that provides real-time weather updates, 5-day forecasts, and historical weather data.

## Features

- Real-time weather updates
- 5-day weather forecast
- Search by city name
- Current location weather
- Save favorite locations
- View search history
- Detailed weather metrics (temperature, humidity, wind, pressure)

## Tech Stack

- Frontend: ReactJS
- Backend: NodeJS + ExpressJS
- Database: MongoDB
- API: OpenWeatherMap API
- Location: HTML5 Geolocation API

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenWeatherMap API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a .env file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   OPENWEATHER_API_KEY=your_openweather_api_key
   PORT=5000
   ```

4. Start the application:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server
   cd ../frontend
   npm start
   ```

## Project Structure

```
├── frontend/                   # ReactJS frontend
│   ├── public/
│   └── src/
│       ├── components/         # UI components
│       ├── pages/             # Page components
│       ├── styles/            # CSS styles
│       ├── App.js
│       └── index.js
├── backend/                    # NodeJS + ExpressJS backend
│   ├── controllers/           # API logic
│   ├── models/                # MongoDB models
│   ├── routes/                # Route definitions
│   ├── utils/                 # API helpers
│   └── server.js              # Express server
└── .env                       # Environment variables
``` 