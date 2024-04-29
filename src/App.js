// import React, { useState, useEffect, useRef } from 'react';

// function App() {
//   const [name, setName] = useState('');
//   const [nationality, setNationality] = useState(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   const fetchNationality = async () => {
//     if (name.trim() === '') {
//       alert('Please enter a name.');
//       return;
//     }

//     try {
//       const response = await fetch(`https://api.nationalize.io?name=${name}`);
//       const data = await response.json();
//       if (data.country.length > 0) {
//         setNationality(data.country[0]);
//       } else {
//         alert('No nationality data found for this name.');
//       }
//     } catch (error) {
//       console.error('Error fetching nationality data:', error);
//       alert('An error occurred while fetching nationality data.');
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Nationality Predictor</h1>
//       <input
//         type="text"
//         placeholder="Enter name"
//         ref={inputRef}
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button onClick={fetchNationality}>Predict</button>
//       {nationality && (
//         <div>
//           <h2>Nationality Details</h2>
//           <p>Name: {name}</p>
//           <p>Country: {nationality.country_id}</p>
//           <p>Probability: {nationality.probability.toFixed(2)}</p>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_API_KEY';

  const fetchWeather = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || 'Failed to fetch weather data.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('An error occurred while fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('Please enter a city name.');
      return;
    }
    fetchWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}


export default App;

