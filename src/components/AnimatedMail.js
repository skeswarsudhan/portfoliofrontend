// AnimatedMail.js
import React from 'react';
import MailIcon from '../media/mail.svg'; // Adjust the path to your mail SVG

const AnimatedMail = ({ style }) => {
  return (
    <img
      src={MailIcon}
      alt="Animated Mail"
      className="animated-mail" /* Apply the animated CSS class */
      style={style}
    />
  );
};

export default AnimatedMail;
