import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ type = 'success', message, duration = 10000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const handleClose = () => {
      if (onClose) {
        onClose();
      }
    };

    // Start the countdown
    const interval = setInterval(() => {
      setProgress(prev => (prev > 0 ? prev - 1 : 0));
    }, duration / 100);

    // Auto-close after the specified duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div className={`notification-container ${type}`}>
      <div className="notification-content">
        <p>{message}</p>
        <button className="close-btn" onClick={() => onClose && onClose()}>
          &times;
        </button>
      </div>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Notification;