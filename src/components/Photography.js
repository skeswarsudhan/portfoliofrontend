import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './photography.css'; // Make sure to create this CSS file
import imgurl from '../media/bg8pnre.png';
import axios from 'axios';

function FadeInSection(props) {
    const [isVisible, setVisible] = useState(false); // Initial visibility set to false
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
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
            className={`fade-in-section-ph ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}


    // useEffect(() => {
    //     fetch('https://portfolioservermain-ycvy.onrender.com/images')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Server Error');
    //             }
    //             return response.json();
    //         })
    //         .then(data => setImages(data))
    //         .catch(error => {
    //             console.error('Error fetching images:', error);
    //             navigate('/server-error'); // Navigate to the error page
    //         });
    // }, [navigate]);


    

    const Photography = ({ photoData }) => {
        const [images, setImages] = useState(photoData || []);

        useEffect(() => {
            const helloserver = async () => {
              try {
                const response = await axios.get('https://portfolioservermain-ycvy.onrender.com/hello', {});
          
               
              } catch (error) {
                
              }
            };
          
            helloserver(); // Call the function
          
          }, []); // Empty dependency array to run it only once
    
        return (
            <div className="parentcon">
                <div className="photography-container">
                    <div className="png-overlay">
                        <img src={imgurl} alt="Overlay" />
                    </div>
                    <div className="text-container">
                        <FadeInSection>
                            <h1 className="toph1">Photography</h1>
                        </FadeInSection>
                        <h1 className="both1"></h1>
                    </div>
                </div>
                <div className="images-container">
                    <div className="images-slide">
                        {images.map((image, index) => (
                            <div key={index} className="image-wrapper">
                                <img src={process.env.PUBLIC_URL + image.image_path} alt={image.tag} className="image-item" />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

export default Photography;
