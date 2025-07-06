const express = require('express');
const router = express.Router();
const { getWeatherByCity, getWeatherByCoordinates, getForecast } = require('../controllers/weatherController');

router.get('/city/:city', getWeatherByCity);
router.get('/coordinates', getWeatherByCoordinates);
router.get('/forecast/:city', getForecast);

module.exports = router;

