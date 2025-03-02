import React, { useState, useEffect } from 'react';
import './mainpage.css';
import imgpf from '../media/pfup2.png'

const MainPage = () => {
  const [greetings, setGreetings] = useState("");
  const [name, setName] = useState("");
  const fullName = "Eswar Sudhan";

  useEffect(() => {
    const x = new Date();
    const y = x.getHours();

    if (y > 6 && y < 11) {
      setGreetings("Good Morning");
    } else if (y >= 11 && y < 16) {
      setGreetings("Good Afternoon");
    } else if (y >= 16 && y < 20) {
      setGreetings("Good Evening");
    } else {
      setGreetings("Hello");
    }

    // Start typing effect after a 2-second delay
    const delayTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setName(fullName.substring(0, index + 1));
        index++;
        if (index === fullName.length) {
          clearInterval(interval);
        }
      }, 100);
    }, 2000);

    return () => clearTimeout(delayTimeout);
  }, []);

  return (
    <div className="container">
      <div className="mp-maincon2">
        <div className="mp-maincon">
        {/* <img 
          src={imgpf} 
          alt="Overlay"
          className="overlay-image"
        /> */}
        <div className="mp-text-container left">
          <h2 className="mph2">{greetings}, this is</h2>
          <h1 className="mph1">{name}</h1>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MainPage;
