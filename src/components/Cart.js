import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; 

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/payment');
  };
  
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name} - {item.quantity} x ${item.price}</p>
              <button className="remove-btn" onClick={() => dispatch(removeItem(item.id))}>
                Remove
              </button>
            </div>
          ))}
          <h3 className="total-amount">Total: ${totalAmount.toFixed(2)}</h3>
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
