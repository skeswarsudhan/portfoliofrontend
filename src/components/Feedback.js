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
      const response = await axios.post('https://portfolioservermain-ycvy.onrender.com/comments', {
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
      {/* <div className='feedbackcon2'> */}
      
    {showForm ? (
      <div  style={{width:'100%'}}>
        <div className='projecttitlecard'>Let me know what you think!</div>

        <div className='form-container'>
          <div className='feedback-form'>
            <form onSubmit={handleSubmit} className='form'>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='form-input'
              />
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='form-input'
              />
              <textarea
                placeholder='Comments'
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows='4'
                required
                className='form-textarea'
              />
              <button
                className={`buttonincon ${feedbackSubmitted === 'Sending...' ? 'sending' : ''}`}
                type='submit'
                disabled={feedbackSubmitted === 'Sending...'}
              >
                {feedbackSubmitted}
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div className='projecttitlecardfp'>
        {/* Show "Thank you" message */}
        <div>Thank you, {isFeedbackSubmit}, for your feedback!</div>

        {/* Mail icons container */}
        {showMailIcons && (
          <div className='mail-icons-wrapper'>
            <div className='mail-icons-container'>
              {mailIcons}
            </div>
            <div className='mail-icons-container'>
              {mailIcons1}
            </div>
            <div className='mail-icons-container'>
              {mailIcons2}
            </div>
          </div>
        )}
        <div className='button-container'>
          <button className='buttoninconnew' onClick={resetFeedback}>
            New Feedback
          </button>
        </div>
      </div>
    )}
 

      {/* <div className='contact-page'>
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
      </div> */}
      {/* </div> */}
    </div>
  );
};

export default FeedbackPage;
