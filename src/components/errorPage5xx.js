import React from 'react';
// import './serverError.css'; // Optional styling

const ServerError = () => {
    return (
        <div className="server-error-container">
            <h1>Server Error</h1>
            <p>Oops! We couldn't fetch the images. Please try again later.</p>
        </div>
    );
};

export default ServerError;
