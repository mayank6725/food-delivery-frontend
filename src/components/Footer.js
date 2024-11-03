import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Your go-to app for quick and easy food delivery.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-list">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@fooddeliveryapp.com" className="footer-link">support@fooddeliveryapp.com</a></p>
          <p>Phone: <span className="footer-contact">+123-456-7890</span></p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Food Delivery App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
