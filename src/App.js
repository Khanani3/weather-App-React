// src/App.js
import React, { useState, useEffect } from 'react';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('New York'); // Default city to load initially

  const apiKey = '8abedd953d36849def5606a6b3df0146';

  // Fetch current weather data
  const fetchWeatherData = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError("Couldn't fetch weather data. Please try again.");
        setWeatherData(null);
      });
  };

  // Fetch 5-day forecast data
  const fetchForecastData = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setForecastData(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching forecast data:', error);
        setError("Couldn't fetch forecast data. Please try again.");
        setForecastData(null);
      });
  };

  useEffect(() => {
    fetchWeatherData(city);
    fetchForecastData(city);
  }, [city]);

  const handleCitySearch = (cityName) => {
    setCity(cityName);
  };

  return (
    <div className="app-container desert-theme">
      <Search onSearch={handleCitySearch} />
      {error ? (
        <p className="error-message">{error}</p>
      ) : weatherData ? (
        <>
          <Weather city={city} weatherData={weatherData} />
          <Forecast forecastData={forecastData} />
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
      
      {/* Footer Section */}
      <footer className="footer">
        <p>
          Open-source code by{' '}
          <a href="https://github.com/Khanani3" target="_blank" rel="noopener noreferrer">
            Khanani Hlungwani
          </a>{' '}
          from SheCodes
        </p>
      </footer>
    </div>
  );
};

export default App;
