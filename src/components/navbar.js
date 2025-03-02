import React, { useState, useEffect } from 'react';
import './navbar.css';
import ChatboxModal from './Chatbox';

const MyNavbar = ({ scrollToProjects, scrollToPhotography, ischat} ) => {
  const [shadow, setShadow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 0);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${shadow ? 'navbar-shadow' : ''}`}>
        <div className="navbar-brand"></div>
        <div className="navbar-links">
          <button className="navbar-dropdown" onClick={scrollToProjects}>
            Projects
          </button>
          <button className="navbar-dropdown" onClick={scrollToPhotography}>
            Photography
          </button>
          <button className="navbar-dropdown" onClick={() => setShowModal(true)}>
            Chat
          </button>
        </div>
      </nav>

      {/* Chatbox Modal */}
      <ChatboxModal show={showModal} onClose={() => setShowModal(false)} val={1} ischatok = {ischat}/>
    </>
  );
};

export default MyNavbar;
