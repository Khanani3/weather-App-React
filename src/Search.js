import React, { useState } from 'react';
import './Search.css'; // Ensure this path is correct

function Search({ onSearch }) {
    const [city, setCity] = useState('');

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = () => {
        if (city.trim()) {
            onSearch(city); // Trigger the search in the parent component
            setCity(''); // Clear the input after search
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Trigger search on Enter key
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={city}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="search-input"
                placeholder="Search for a city..."
            />
            <button onClick={handleSearch} className="search-button">Search</button>
        </div>
    );
}

export default Search;
