import React from 'react';
import './Forecast.css'; // Import the CSS file

const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) {
    return null; // Return null if there's no forecast data
  }

  const forecastItems = forecastData.list.filter((item, index) => index % 8 === 0); // Get data every 8th item for daily forecast

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return '🌞'; // Sunny
      case 'few clouds':
        return '🌤️'; // Partly Cloudy
      case 'scattered clouds':
      case 'broken clouds':
        return '☁️'; // Cloudy
      case 'shower rain':
      case 'rain':
        return '🌧️'; // Rainy
      case 'thunderstorm':
        return '⛈️'; // Thunderstorm
      case 'snow':
        return '❄️'; // Snowy
      case 'windy':
      case 'mist':
      case 'fog':
        return '🌬️'; // Windy
      default:
        return '☀️'; // Default to a sun icon
    }
  };

  return (
    <div className="forecast-container">
      <div className="forecast-grid">
        {forecastItems.map((forecast, index) => (
          <div className="forecast-item" key={index}>
            <span className="weather-icon">
              {getWeatherIcon(forecast.weather[0].description)}
            </span>
            <p>{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p>{forecast.weather[0].description}</p>
            <p>{Math.round(forecast.main.temp)}°C</p> {/* Display temperature */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
