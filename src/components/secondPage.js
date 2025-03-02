import React, { useEffect, useState, useRef } from 'react';
import './secondpage.css'; // Assuming you have a secondpage.css file for styling
import imgurl from '../media/pf1.jpg';

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false); // Initial visibility set to false
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Disconnect the observer once the element is visible
        }
      });
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (observer && domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

const SecondPage = () => {
  return (
    <div className="sp-big-container">
      <FadeInSection>
        <div style={{ display: 'flex' }}>
          <div className="spcontainer1">
            <h3 className="sph3">About me:</h3>
            <h2 className="sph2">
              I work on <span className="sph1 ip">Projects</span> and take <span className="sph1 ds">Photos</span>
            </h2>
          </div>

          <div className="spcontainer2">
            <h2 className="sph2">
              Hey there! I'm Eswar, an AI engineer with a passion for building full-stack applications and creating meaningful digital experiences. And I also take photos. Welcome to my little corner on the web—happy to have you here!
            </h2>
          </div>
        </div>
      </FadeInSection>

      <div className="spcontainer3"></div>
    </div>
  );
};

export default SecondPage;