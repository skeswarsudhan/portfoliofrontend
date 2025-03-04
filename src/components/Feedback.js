import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './feedback.css';
import AnimatedMail from './AnimatedMail';
// import './contact.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState('Submit');
  const [showMailIcons, setShowMailIcons] = useState(false);
  const [showForm, setShowForm] = useState(true);
 

  // Store user's name instead of a boolean
  const [isFeedbackSubmit, setIsFeedbackSubmit] = useState(
    localStorage.getItem('isFeedbackSubmit') || ''
  );

  useEffect(() => {
    if (isFeedbackSubmit.length > 0) {
      setShowForm(false);
    }
  }, [isFeedbackSubmit]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !comments) {
      setMessage('All fields are required.');
      return;
    }
    setFeedbackSubmitted('Sending...');

    try {
      const response = await axios.post('https://portfolioservermain-vn6i.onrender.com/comments', {
        name,
        email,
        comment: comments,
      });

      if (response.status === 201) {
        setMessage('Feedback submitted successfully!');
        setFeedbackSubmitted(true);
        setShowForm(false);
        setShowMailIcons(true);
        setIsFeedbackSubmit(name); // Store the user's name
        localStorage.setItem('isFeedbackSubmit', name);
      } else {
        setMessage('Failed to submit feedback.');
      }
    } catch (error) {
      setMessage('An error occurred while submitting feedback.');
      console.error('There was an error!', error);
      alert('An error occurred while submitting feedback');
    }
  };

  const generateRandomPosition = (index) => {
    const offset = index * 10;
    return { left: `${offset + 27}%`, top: `20px` };
  };

  const generateRandomAnimationStyle = () => {
    const randomDuration = Math.random() * 3 + 1;
    const randomDelay = Math.random() * 2;
    return {
      animation: `scaleUpDown ${randomDuration}s infinite alternate`,
      animationDelay: `${randomDelay}s`,
    };
  };

  const contactDetails = {
    github: 'https://github.com/skeswarsudhan',
    email: 'skeswarsudhan@gmail.com',
    linkedin: 'https://www.linkedin.com/in/skeswarsudhan/',
    location: 'Trichy, Tamil Nadu',
  };

  

   // Create an array of mail icons with specific positions
   const mailIcons = Array.from({ length: 5 }).map((_, index) => (
    <AnimatedMail
      key={index}
      style={{
        ...generateRandomPosition(index),
        ...generateRandomAnimationStyle(),
        position: 'absolute',
      }}
    />
    ))
    const mailIcons1 = Array.from({ length: 5 }).map((_, index) => (
      <AnimatedMail
        key={index}
        style={{
          ...generateRandomPosition(index),
          ...generateRandomAnimationStyle(),
          position: 'absolute',
        }}
      />
    
      ));

      const mailIcons2 = Array.from({ length: 5 }).map((_, index) => (
        <AnimatedMail
          key={index}
          style={{
            ...generateRandomPosition(index),
            ...generateRandomAnimationStyle(),
            position: 'absolute',
          }}
        />
      
        ));
        const resetFeedback = () => {
          localStorage.removeItem('isFeedbackSubmit');
          setFeedbackSubmitted('Submit');
          setIsFeedbackSubmit('');
          setShowForm(true);
          setName('');
          setEmail('');
          setComments('');
        };

  return (
    <div className='feedbackcon'>
      <div className='feedbackcon2'>
      {showForm ? (
        <div>
          <div className='projecttitlecard'>Let me know what you think!</div>

          <div style={{ height: '40vh' }}>
            <div
              style={{
                maxWidth: '700px',
                margin: 'auto',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '10px',
                marginTop: '50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'rgb(240,240,240)',
                fontWeight: '400',
                marginBottom:'1vh'
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid rgb(0,0,0,0)' }}
                />
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid rgb(0,0,0,0)' }}
                />
                <textarea
                  placeholder='Comments'
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows='4'
                  required
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid rgb(0,0,0,0)',
                    maxWidth: '100%',
                    resize: 'none',
                    overflow: 'auto',
                  }}
                />
                <button
                  className='buttonincon'
                  type='submit'
                  disabled={feedbackSubmitted === 'Sending...'}
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    cursor: feedbackSubmitted === 'Sending...' ? 'not-allowed' : 'pointer',
                    opacity: feedbackSubmitted === 'Sending...' ? 0.6 : 1,
                  }}
                >
                  {feedbackSubmitted}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='projecttitlecard'>
          {/* Show "Thank you" message */}
          <div>Thank you, {isFeedbackSubmit}, for your feedback!</div>

          {/* Mail icons container */}
          {showMailIcons && (
            
            <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                position: 'relative',
                height: '100px',
              }}
            >
              {mailIcons}
              
            </div>
              <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                position: 'relative',
                height: '100px',
              }}
            >
              {mailIcons1}
              
            </div>
              <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                position: 'relative',
                height: '100px',
              }}
            >
              {mailIcons2}
              
            </div>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>

          <button className='buttoninconnew' 
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
          onClick={resetFeedback}>
            New Feedback
          </button>
          </div>

          </div>
      )}

      <div className='contact-page'>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
          <div className='contact-item'>
            <GitHubIcon className='contact-icon' />
            <a href={contactDetails.github} target='_blank' rel='noopener noreferrer'>
              {contactDetails.github}
            </a>
          </div>
          <div className='contact-item'>
            <EmailIcon className='contact-icon' />
            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '50px' }}>
          <div className='contact-item'>
            <LinkedInIcon className='contact-icon' />
            <a href={contactDetails.linkedin} target='_blank' rel='noopener noreferrer'>
              {contactDetails.linkedin}
            </a>
          </div>
          <div className='contact-item'>
            <LocationOnIcon className='contact-icon' />
            <span> {contactDetails.location}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
