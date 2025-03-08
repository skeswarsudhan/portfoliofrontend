import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './chatbox.css'; // Import your CSS file for styling
import axios from 'axios'; // Import axios for making HTTP requests

const { TextArea } = Input;

const Inputcon = ({ onSendMessage, onClearChatHistory, showbutton }) => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = async () => {
    if (userInput.trim() !== '') {
      onSendMessage(userInput);
      setUserInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (

    <div className="input-group mt-3">
  <textarea
    className="chat-textarea"
    rows={2}
    placeholder="Ask your questions..."
    value={userInput}
    onChange={handleInputChange}
    onKeyPress={handleKeyPress}
  />
  {!showbutton && userInput.length > 0 && (
    <Button
      className="send-button"
      size="large"
      shape="circle"
      icon={<SendOutlined />}
      onClick={handleSend}
    />
  )}

  <button className='buttoninconch' onClick={onClearChatHistory}>
    Clear
  </button>
</div>

)}

export default Inputcon;