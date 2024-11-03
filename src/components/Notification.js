import React, { useState, useEffect } from 'react';
import './Notification.css'; // Import the styles

const Notification = ({ type = 'success', message, duration = 10000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Start the countdown
    const interval = setInterval(() => {
      setProgress(prev => (prev > 0 ? prev - 1 : 0));
    }, duration / 100);

    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`notification-container ${type}`}>
      <div className="notification-content">
        <p>{message}</p>
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
      </div>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Notification;