// src/pages/LoadingScreen.js
import React, { useEffect } from 'react';
import './LoadingScreen.css';
import soundEffect from '../Multi/carga.mp3'; 

const LoadingScreen = () => {
  useEffect(() => {
    const audio = new Audio(soundEffect);
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []); // Ejecuta cada vez que LoadingScreen se monta

  return (
    <div className="loading-container">
      <img src={`${process.env.PUBLIC_URL}/Logo.png`} alt="Logo" className="loading-logo" />
    </div>
  );
};

export default LoadingScreen;
