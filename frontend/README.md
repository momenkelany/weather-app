# Weather Forecast App

A modern, responsive weather application built with React and Material-UI, featuring a beautiful gradient design and smooth animations.

## Features

- **Modern Design**: Beautiful gradient background with glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth hover effects and animations
- **Weather Search**: Search for weather by city name or use current location
- **5-Day Forecast**: Extended weather forecast display
- **Search History**: Keep track of previously searched cities
- **Material-UI Components**: Professional UI components with custom styling

## Design Highlights

- **Gradient Background**: Purple to blue gradient with animated floating particles
- **Glassmorphism**: Translucent elements with backdrop blur effects
- **Smooth Animations**: Hover effects, floating animations, and transitions
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Interactive Buttons**: Animated buttons with shimmer effects
- **Responsive Grid**: Adaptive layouts for different screen sizes

## Technology Stack

- **React 19.1.0**: Modern React with hooks and functional components
- **Material-UI 5.17.1**: Professional UI component library
- **React Router 7.6.0**: Client-side routing
- **CSS3**: Advanced styling with gradients, animations, and effects
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## Project Structure

```
src/
├── components/
│   ├── Navbar.js & Navbar.css          # Navigation bar with glassmorphism
│   ├── SearchBox.js & SearchBox.css    # Search input with animations
│   └── WeatherCard.js & WeatherCard.css # Weather display cards
├── pages/
│   ├── Home.js                          # Landing page
│   ├── Forecast.js                      # Weather forecast page
│   └── History.js & History.css         # Search history page
├── styles/
│   └── App.css                          # Global styles and animations
└── App.js                               # Main application component
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages:

1. **Update package.json homepage**
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/weather-app"
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## API Integration

The app is designed to work with a weather API backend. Currently configured endpoints:

- `GET /api/weather/city/:city` - Current weather data
- `GET /api/weather/forecast/:city` - 5-day forecast
- `GET /api/history` - Search history

For production deployment, you'll need to:
1. Set up a backend API service
2. Update API endpoints in the React components
3. Configure environment variables

## Styling Features

### Global Styles
- Animated gradient background
- Floating particle effects
- Glassmorphism design language
- Smooth transitions and hover effects

### Component Styles
- **Navbar**: Translucent with backdrop blur
- **Search Box**: Animated input with shimmer effects
- **Weather Cards**: Floating cards with hover animations
- **Buttons**: Gradient backgrounds with interactive effects

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Optimized production build
- Lazy loading components
- Efficient CSS animations
- Responsive images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Screenshots

The app features a beautiful modern design with:
- Purple-to-blue gradient background
- Glassmorphism navigation bar
- Animated search interface
- Responsive weather cards
- Smooth hover effects

Perfect for showcasing modern web development skills and design principles!

