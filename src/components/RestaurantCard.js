import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css'; // Make sure to import the CSS file

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
      <div className="image-container">
        <img src="https://via.placeholder.com/150" alt={restaurant.name} />
      </div>
      <h3 className="restaurant-name">{restaurant.name}</h3>
      <p className="restaurant-address">{restaurant.address.street}, {restaurant.address.city}</p>
      <p className="restaurant-rating">Rating: {restaurant.rating}</p>
    </Link>
  );
};

export default RestaurantCard;
