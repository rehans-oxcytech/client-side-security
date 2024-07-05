// TestGeolocation.js

import React, { useState } from 'react';

const TestGeolocation = () => {
  const [status, setStatus] = useState('');

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(`Geolocation is enabled. Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        },
        (error) => {
          setStatus(`Geolocation is disabled. Error: ${error.message}`);
        }
      );
    } else {
      setStatus('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>Test Geolocation</h1>
      <button onClick={handleGetLocation}>Get Location</button>
      <p>{status}</p>
    </div>
  );
};

export default TestGeolocation;
