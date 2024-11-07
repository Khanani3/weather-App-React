import React from 'react';
import './Weather.css';

function Weather({ city, weatherData, recentCities = [] }) {
    const getWeatherEmoji = (description) => {
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
            case 'mist':
            case 'fog':
            case 'haze':
                return '🌫️'; // Misty/Foggy
            default:
                return '☀️'; // Default to sun icon
        }
    };

    const weatherEmoji = getWeatherEmoji(weatherData?.weather[0].description);
    const currentDate = new Date().toLocaleString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    const airQuality = "Good"; // Placeholder for actual air quality data
    const precipitation = weatherData?.rain ? weatherData.rain['1h'] : 0;

    return (
        <div className="weather-container">
            <div className="recent-cities">
                {recentCities.map((city, index) => (
                    <span key={index} className="recent-city">{city}</span>
                ))}
            </div>
            <h2 className="city-name">{city}</h2>
            <div className="weather-details">
                <div className="left-details">
                    <p className="weather-description">
                        <span>{weatherData?.weather[0]?.description}</span>
                    </p>
                    <p className="humidity">Humidity: {weatherData?.main.humidity}%</p>
                    <p className="precipitation">Precipitation: {precipitation} mm</p>
                    <p className="air-quality">Air Quality: {airQuality}</p>
                    <p className="date-time">{currentDate}</p>
                </div>
                <div className="right-details">
                    <div className="temperature">
                        <span className="weather-emoji">{weatherEmoji}</span>
                        <span>{Math.round(weatherData?.main.temp)}°C</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
