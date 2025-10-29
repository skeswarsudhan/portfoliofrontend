import React, { useEffect, useState, useRef, useCallback } from 'react';
import './secondpage.css';
import imgtur from '../media/turing-logo.jpg'
import imgfcr from '../media/FocurR_arrow.png'

function FadeInSection({ children, delay = 0 }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  const observerRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    const currentRef = domRef.current;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.3) {
            // Add delay if specified
            timeoutRef.current = setTimeout(() => {
              setVisible(true);
            }, delay);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      className={`focus-text-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

const SecondPage = ({ isSmallScreen }) => {
  const [imagesLoaded, setImagesLoaded] = useState({
    turing: false,
    focusr: false
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const handleImageLoad = useCallback((imageName) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageName]: true
    }));
  }, []);

  const handleImageError = useCallback((imageName) => {
    console.error(`Failed to load ${imageName} image`);
    setImagesLoaded(prev => ({
      ...prev,
      [imageName]: true
    }));
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = [
          { name: 'turing', src: imgtur },
          { name: 'focusr', src: imgfcr }
        ].map(({ name, src }) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              handleImageLoad(name);
              resolve();
            };
            img.onerror = () => {
              handleImageError(name);
              resolve();
            };
            img.src = src;
          });
        });

        await Promise.all(imagePromises);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsInitialized(true);
      }
    };

    preloadImages();
  }, [handleImageLoad, handleImageError]);

  // Show loading state until images are preloaded
  if (!isInitialized) {
    return (
      <div className="sp-big-container">
        <div className="loading-container">
          <div className="loading-placeholder">Loading content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="sp-big-container">
      <div className="spcontainer3">
        <h2 className="spabm">
          <h3 className='sph3'>About Me</h3> 
          <FadeInSection delay={0}>
            Hello, welcome to my portfolio! I am an engineer with a B.Tech degree in AI. I enjoy designing and developing end-to-end applications, working on AI, and taking photos. You can explore my work on this page.
          </FadeInSection>
        </h2>
      </div>
      
      <div className='sp-big-container1'>
        <div className="spcontainer1">
          <h2 className="sph2">
            <h3 className='sph3'>I know:</h3> 
            <FadeInSection delay={200}>
              <h3 className='spabm'>
                Python, MATLAB, SQL, Git, TensorFlow, PyTorch, HTML, CSS, React.js, MySQL, Django RestFramework, Flask, MongoDB.
              </h3>
            </FadeInSection>
          </h2>
        </div>

        <div className="spcontainer2">
          <h2 className="sph2">
            <h3 className="sph3" style={{paddingBottom:'0.5vw'}}>Experience:</h3>
            <FadeInSection delay={400}>
              <div className="experience-item">
                <div className="job-details">
                  <a href="https://www.turing.com" target="_blank" rel="noopener noreferrer">
                    <img 
                      src={imgtur} 
                      alt="Turing Logo" 
                      className={`company-logo ${imagesLoaded.turing ? 'loaded' : 'loading'}`}
                      style={{ opacity: imagesLoaded.turing ? 1 : 0 }}
                    />
                  </a>
                  <p className="job-title">Turing - Data Analyst</p>
                  <p className="job-date">Aug 2024 – Present</p>
                </div>
                <p className="job-description">
                  Developed and optimized the backend architecture for an AI hiring platform using Django REST Framework, enhancing the scalability of candidate screening. Created and deployed Python microservices for resume parsing and candidate matching, cutting recruiter effort by over 60%. Additionally, debugged and resolved critical scalability issues in LLM-generated FastAPI code for enterprise clients such as Apple and Amazon.
                </p>
              </div>

              <div className="experience-item">
                <div className="job-details">
                  <a href="https://www.focusrtech.com" target="_blank" rel="noopener noreferrer">
                    <img 
                      src={imgfcr} 
                      alt="FocusR Logo" 
                      className={`company-logo ${imagesLoaded.focusr ? 'loaded' : 'loading'}`}
                      style={{ opacity: imagesLoaded.focusr ? 1 : 0 }}
                    />
                  </a>
                  <p className="job-title">FocusR - Software engineering intern</p>
                  <p className="job-date">Feb 2024 – May 2024</p>
                </div>
                <p className="job-description">
                  Engineered the backend for a campus placement web application with Django REST Framework, creating role-based workflows for staff and students. Automated the exportation of shortlisted candidate data to Excel, which streamlined placement operations and slashed manual effort for coordinators by up to 70%.
                </p>
              </div>
            </FadeInSection>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;