import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import PaymentPage from './components/PaymentPage';
import Orders from './components/Orders'
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart'
import ApolloClientProvider from './apolloClient';
import Notification from './components/Notification';
import Register from './components/Register';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Logout({ setAuthToken }) {
  useEffect(() => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  }, [setAuthToken]);
  return <Navigate to="/login" replace />;
}

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('success');

  const triggerNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message)
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <ApolloClientProvider>
      <Router>
        {authToken && <Header />}
        {showNotification && (
          <Notification
            type={notificationType}
            message={notificationType === 'success' ? notificationMessage : 'Something went wrong!'}
            onClose={handleCloseNotification}
          />
        )}
        <Routes>
          {authToken ? (
            <>
              <Route path="/" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/logout" element={<Logout setAuthToken={setAuthToken} />} />
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/payment" element={<PaymentPage triggerNotification={triggerNotification}/>}/>
              <Route path="/orders" element={<Orders />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={setAuthToken} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
        {authToken && <Footer />}  
      </Router>
    </ApolloClientProvider>
  );
}

export default App;
