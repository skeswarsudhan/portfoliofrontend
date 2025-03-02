import React from 'react';
import './errorPage.css'; // Create a separate CSS file for styling

const ErrorPage4xx = () => {
  return (
    <div className="error-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
    </div>
  );
};

export default ErrorPage4xx;
