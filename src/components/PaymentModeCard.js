import React, { useState } from 'react';
import './PaymentModeCard.css'; // Import the CSS file for styles

const PaymentModeCard = ({ onProceed }) => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('');

  const handlePaymentModeChange = (event) => {
    setSelectedPaymentMode(event.target.value);
  };

  const handleProceedToPayment = () => {
    if (selectedPaymentMode) {
      onProceed(selectedPaymentMode);
    } else {
      alert('Please select a payment mode.');
    }
  };

  return (
    <div className="payment-card">
      <h3 className="payment-title">Select a Payment Mode</h3>
      <div className="payment-options">
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMode"
            value="DebitCard"
            checked={selectedPaymentMode === 'DebitCard'}
            onChange={handlePaymentModeChange}
          />
          Debit Card
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMode"
            value="CreditCard"
            checked={selectedPaymentMode === 'CreditCard'}
            onChange={handlePaymentModeChange}
          />
          Credit Card
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMode"
            value="UPI"
            checked={selectedPaymentMode === 'UPI'}
            onChange={handlePaymentModeChange}
          />
          UPI
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMode"
            value="Cash"
            checked={selectedPaymentMode === 'Cash'}
            onChange={handlePaymentModeChange}
          />
          Cash
        </label>
      </div>
      <button className="proceed-button" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default PaymentModeCard;
