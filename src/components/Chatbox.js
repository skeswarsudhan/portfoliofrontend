import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "rsuite";
import ReactMarkdown from "react-markdown";
import Inputcon from "./Inputcon";
import "rsuite/dist/rsuite.min.css";
import "./chatbox.css";

const ChatboxModal = ({ show, onClose, val: conversationId,ischatok }) => {
  const [conversation, setConversation] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (show) {
  
      setTimeout(() => scrollToBottom(500), 100);
    }
  }, [show]);

  useEffect(() => {
    if (conversation.length > 0) {
      scrollToBottom(500);
    }
  }, [conversation]);

  useEffect(() => {
    loadLocalChatHistory();
  }, [conversationId]);


  const loadLocalChatHistory = () => {
    const storedChat = localStorage.getItem(`chat_history${conversationId}`);
    if (storedChat) {
      setConversation(JSON.parse(storedChat));
    }
  };

  const saveToLocalChatHistory = (newChat) => {
    localStorage.setItem(`chat_history${conversationId}`, JSON.stringify(newChat));
  };

  const clearChatHistory = () => {
    setConversation([]);
    localStorage.removeItem(`chat_history${conversationId}`);
  };

  const sendInitialMessage = async () => {
    if (conversation.length === 0) {
      try {
        const response = await axios.post("https://portfolioserver-kwag.onrender.com/ask", {
          question: "Hello",
          conversation_id: conversationId,
          chat_history: [],
        });

        const assistantMessage = { user: null, assistant: response.data.answer };
        setConversation([assistantMessage]);
      } catch (error) {
        console.error("Error sending initial message:", error);
      }
    }
  };

  const addUserMessage = async (message) => {
    const newMessage = { user: message, assistant: null };
    const updatedConversation = [...conversation, newMessage].slice(-10);

    setConversation(updatedConversation);
    saveToLocalChatHistory(updatedConversation);
    setIsGenerating(true);

    try {
      const response = await axios.post("https://portfolioserver-kwag.onrender.com/ask", {
        question: message,
        conversation_id: conversationId,
        chat_history: updatedConversation,
      });

      const assistantMessage = { user: null, assistant: response.data.answer };
      const newConversation = [...updatedConversation.slice(-9), assistantMessage];

      setConversation(newConversation);
      saveToLocalChatHistory(newConversation);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <Modal open={show} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Proxy Assistant</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
        {conversation.length === 0?
        <div className="chatcontainerempty">
          <div className="mph1c">
          Hello, I am Proxy Assistant!
          </div>
          <div className="spabmc">
          A chatbot designed to provide instant insights into Eswar Sudhan’s professional work and hobbies. Feel free to ask any questions related to them! For detailed queries, kindly contact him.
          </div>
        </div>:
         <div className="chatcontainer">
          <div className="chat-container" ref={chatContainerRef}>
            {conversation.map((msg, index) => (
              <React.Fragment key={index}>
                {msg.user && <div className="user-message">{msg.user}</div>}
                {msg.assistant && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="iconcon" />
                    <div className="opposite-message-2">
                      <ReactMarkdown>{msg.assistant}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            {isGenerating && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="iconcon" />
                <div className="opposite-message-2">Generating...</div>
              </div>
            )}
          </div>
        </div> }
      </Modal.Body>
      <Modal.Footer className="modalfooter">
        { ischatok==='chatok'?
        <div style={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
          <Inputcon onSendMessage={addUserMessage} onClearChatHistory={clearChatHistory} showbutton={isGenerating} />
        </div>: ischatok}
      </Modal.Footer>
    </Modal>
  );
};

export default ChatboxModal;
