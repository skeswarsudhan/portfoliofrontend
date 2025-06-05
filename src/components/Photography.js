import React, { useState, useEffect } from 'react';
import './mainpage.css';
import imgpf from '../media/pfup2.png';

const MainPage = () => {
  const [greetings, setGreetings] = useState('');
  const [name, setName] = useState('');
  const fullName = 'Eswar Sudhan';

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    const greeting = 
      hour > 6 && hour < 11 ? 'Good Morning' :
      hour >= 11 && hour < 16 ? 'Good Afternoon' :
      hour >= 16 && hour < 20 ? 'Good Evening' :
      'Hello';
    setGreetings(greeting);

    // Start typing immediately
    let index = 0;
    const interval = setInterval(() => {
      setName(prev => prev + fullName.charAt(index));
      index++;
      if (index === fullName.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="mp-maincon2">
        <div className="mp-maincon">
          <img 
            src={imgpf} 
            alt="Overlay" 
            className="overlay-image"
            loading="lazy"
            width="100%" // optional, but helps prevent layout shift
          />
          <div className="mp-text-container left">
            <h2 className="mph2">{greetings}, this is</h2>
            <h1 className="mph1">{name || <span className="blink-cursor">|</span>}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
