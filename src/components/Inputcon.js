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
        style={{
          width: '100%',
          border: '1px solid rgb(213, 213, 213)',
          padding: '10px',
          borderRadius: '5px'
        }}
        rows={2}
        placeholder="Ask your questions..."
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {!showbutton && userInput.length > 0 && (
        <Button
          style={{ marginLeft: '10px', color: 'rgb(50,50,100)' }}
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
  );
};

export default Inputcon;