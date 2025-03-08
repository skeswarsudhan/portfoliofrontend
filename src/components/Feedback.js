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
  const [feedbackSubmitted, setFeedbackSubmitted] = useState('Send');
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
        <div className='projecttitlecardfpi'>Let me know what you think!</div>

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
                rows='3'
                required
                className='form-textarea'
              />
              <button
                className={`buttonincon ${feedbackSubmitted === 'Sending...' ? 'sending' : ''}`}
                type='submit'
                disabled={feedbackSubmitted === 'Sending...'}
              >
                {feedbackSubmitted} <EmailIcon/>
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
 

      
    </div>
  );
};

export default FeedbackPage;
