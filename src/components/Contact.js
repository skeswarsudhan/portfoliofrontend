// ContactPage.js
import React from 'react';
import './contact.css'; // Import CSS for styling
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactPage = () => {
  const contactDetails = {
    github: 'https://github.com/yourusername',
    email: 'youremail@example.com',
    linkedin: 'https://www.linkedin.com/in/yourusername/',
    location: 'Your City, Country',
  };

  return (
    <div className="contact-page">
     <div style={{display: 'flex', flexDirection: 'column',padding:'30px'}}>
      <div className="contact-item">
        <GitHubIcon className="contact-icon" />
        <a href={contactDetails.github} target="_blank" rel="noopener noreferrer">
          GitHub: {contactDetails.github}
        </a>
      </div>
      <div className="contact-item">
        <EmailIcon className="contact-icon" />
        <a href={`mailto:${contactDetails.email}`}>Email: {contactDetails.email}</a>
      </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', padding:'50px'}}>
      <div className="contact-item">
        <LinkedInIcon className="contact-icon" />
        <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn: {contactDetails.linkedin}
        </a>
      </div>
      <div className="contact-item">
        <LocationOnIcon className="contact-icon" />
        <span>Location: {contactDetails.location}</span>
      </div>
      </div>
    </div>
  );
};

export default ContactPage;
