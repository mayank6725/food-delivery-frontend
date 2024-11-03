import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { GET_RESTAURANT_BY_ID } from '../graphql/queries';
import { addItem, removeItem, clearCart } from '../features/cart/cartSlice';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RESTAURANT_BY_ID, {
    variables: { id },
  });
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const currentRestaurantId = useSelector((state) => state.cart.restaurantId);
  const [showReplaceCartModal, setShowReplaceCartModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const navigate = useNavigate(); // Replaces useHistory

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { restaurant } = data;

  const getItemQuantity = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddItem = (item) => {
    if (currentRestaurantId && currentRestaurantId !== restaurant.id) {
      setPendingItem(item);
      setShowReplaceCartModal(true);
    } else {
      dispatch(addItem({ ...item, restaurantId: restaurant.id }));
    }
  };

  const handleReplaceCart = () => {
    dispatch(clearCart());
    dispatch(addItem({ ...pendingItem, restaurantId: restaurant.id }));
    setShowReplaceCartModal(false);
    setPendingItem(null);
  };

  const handleCancelReplaceCart = () => {
    setShowReplaceCartModal(false);
    setPendingItem(null);
  };

  const handleProceedToCart = () => {
    navigate('/cart'); 
  };

  return (
    <div className="restaurant-details">
      <h2>{restaurant.name}</h2>
      <p className="restaurant-address">
        {restaurant.address.street}, {restaurant.address.city}
      </p>
      <p>Rating: {restaurant.rating}</p>
      <p>{restaurant.description}</p>

      <div className="menu-section">
        <h3>Menu</h3>
        <ul>
          {restaurant.menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Category: {item.category}</p>
                {item.description && <p>Description: {item.description}</p>}
              </div>
              <div className="item-controls">
                <div className="item-quantity-controls">
                  <button
                    className="decrease-btn"
                    onClick={() => dispatch(removeItem(item.id))}
                    disabled={getItemQuantity(item.id) === 0}
                  >
                    -
                  </button>
                  <span className="quantity">
                    {getItemQuantity(item.id)}
                  </span>
                  <button
                    className="increase-btn"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </button>
                </div>
                <div className="item-price">${item.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showReplaceCartModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Your cart contains items from another restaurant. Do you want to clear the cart and add items from this restaurant?</p>
            <button onClick={handleReplaceCart}>Yes, replace cart</button>
            <button onClick={handleCancelReplaceCart}>No, keep current cart</button>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <p>
            {cartItems.length} items - Total: ${totalAmount.toFixed(2)}
          </p>
          <button onClick={handleProceedToCart} className="proceed-to-cart-btn">
            Proceed to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
