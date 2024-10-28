import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <img src={process.env.PUBLIC_URL + '/Logo.png'} alt="Logo" className="loading-logo" />
    </div>
  );
};

export default LoadingScreen;
