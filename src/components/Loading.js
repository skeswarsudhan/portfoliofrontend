import React, { useState, useEffect } from "react";
import "./loading.css";

function Loading() {
  const text = "...hello...";
  const [fadeInIndex, setFadeInIndex] = useState(-1); // Tracks the dots appearing
  const [waveIndex, setWaveIndex] = useState(-1); // Tracks the wave motion
  const [transformed, setTransformed] = useState([]); // Tracks if a dot is replaced by a letter

  useEffect(() => {
    // Handle fade-in of dots
    const fadeInterval = setInterval(() => {
      setFadeInIndex((prevIndex) =>
        prevIndex < text.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 300); // Speed of fade-in effect

    return () => clearInterval(fadeInterval);
  }, [text.length]);

  useEffect(() => {
    // Start wave motion after all dots are visible
    if (fadeInIndex === text.length - 1) {
      const waveInterval = setInterval(() => {
        setWaveIndex((prevIndex) => {
          const nextIndex = prevIndex < text.length - 1 ? prevIndex + 1 : text.length - 1;

          // Only show letter when the wave reaches the peak for each dot
          if (nextIndex === prevIndex) {
            setTransformed((prevTransformed) => {
              const updated = [...prevTransformed];
              updated[nextIndex] = true; // Mark the current index as transformed
              return updated;
            });
          }

          if (nextIndex === text.length - 1) {
            clearInterval(waveInterval); // Stop the wave after one full cycle
          }

          return nextIndex;
        });
      }, 200); // Fast wave speed

      return () => clearInterval(waveInterval);
    }
  }, [fadeInIndex, text.length]);

  return (
    <div className="loading-container">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`dot ${
            index <= waveIndex ? "active" : index <= fadeInIndex ? "fade-in" : ""
          }`}
          style={{
            animationDelay: `${index*0.001 }s`, // Creates wave effect
          }}
        >
          <span className="fade">
            {/* Show letter only when wave reaches the peak for each dot */}
            {index <= waveIndex && index <= fadeInIndex ? char : "."}
          </span>
        </span>
      ))}
    </div>
  );
}

export default Loading;
