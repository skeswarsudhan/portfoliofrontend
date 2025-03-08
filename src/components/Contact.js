import React from 'react';
import './contact.css'; // Import CSS for styling
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactPage = () => {
  const contactDetails = {
    github: 'https://github.com/skeswarsudhan',
    email: 'skeswarsudhan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/skeswarsudhan/',
    location: 'Trichy, Tamil Nadu',
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        {/* <h2 className="contact-title">Get In Touch</h2> */}
        <div className="contact-divider"></div>
        
        <div className="contact-grid">
          <div className="contact-item">
            <div className="icon-container">
              <GitHubIcon className="contact-icon" />
            </div>
            <div className="contact-text">
              <span className="contact-label">GitHub</span>
              <a href={contactDetails.github} target="_blank" rel="noopener noreferrer">
                {contactDetails.github.replace('https://github.com/', '')}
              </a>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="icon-container">
              <EmailIcon className="contact-icon" />
            </div>
            <div className="contact-text">
              <span className="contact-label">Email</span>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="icon-container">
              <LinkedInIcon className="contact-icon" />
            </div>
            <div className="contact-text">
              <span className="contact-label">LinkedIn</span>
              <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer">
                {contactDetails.linkedin.replace('https://www.linkedin.com/in/', '')}
              </a>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="icon-container">
              <LocationOnIcon className="contact-icon" />
            </div>
            <div className="contact-text">
              <span className="contact-label">Location</span>
              <span>{contactDetails.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;