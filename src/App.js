import React, { useState, useEffect, useRef } from 'react';

function App() {
  // component App which contains the state variables name
  // (for the input value) and nationality (to store the fetched nationality data).
  // useRef hook is used to create a reference to the input field for focusing it.
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState(null);
  const inputRef = useRef(null);
// useEffect hook is used to autofocus the input field when the component mounts.
  useEffect(() => {
    inputRef.current.focus();
  }, []);
//When the user enters a name and clicks the "Predict" button, the fetchNationality
// function is called. This function makes a request to the nationalize.io 
  const fetchNationality = async () => {
    if (name.trim() === '') {
      alert('Please enter a name.');
      return;
    }

    try {
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      const data = await response.json();
      if (data.country.length > 0) {
        setNationality(data.country[0]);
      } else { //If no data is found for the entered name, it shows an alert message.
        alert('No nationality data found for this name.');
      }
    } catch (error) {
      console.error('Error fetching nationality data:', error);
      alert('An error occurred while fetching nationality data.');
    }
  };

  return (
    <div className="App">
      <h1>Nationality Predictor</h1>
      <input
        type="text"
        placeholder="Enter name"
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={fetchNationality}>Predict</button>
      {nationality && (
        <div>
          <h2>Nationality Details</h2>
          <p>Name: {name}</p>
          <p>Country: {nationality.country_id}</p>
          <p>Probability: {nationality.probability.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
export default App