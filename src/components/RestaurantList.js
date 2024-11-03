import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RESTAURANTS } from '../graphql/queries';
import RestaurantCard from './RestaurantCard';
import SearchBox from './SearchBox';
import './RestaurantList.css';

const RestaurantList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  const handleSearch = (query) => {
    setSearchQuery(query.trim().toLowerCase());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Get all restaurants
  const allRestaurants = data.restaurants || [];

  // Filter restaurants based on the search query
  const filteredRestaurants = allRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery)
  );

  const itemsPerPage = 3; // Change this to show more or less items
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const startIndex = currentIndex * itemsPerPage;
  const currentRestaurants = filteredRestaurants.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="restaurant-list-container">
      <h2 className="restaurant-list-header">Discover the best food & drinks</h2>
      <div className="search-box-container">
        <SearchBox onSearch={handleSearch} />
      </div>
      {filteredRestaurants.length === 0 ? (
        <p className="no-results">No results found for "{searchQuery}"</p>
      ) : (
        <div className="carousel-container">
          <button className="carousel-button" onClick={prevPage} disabled={currentIndex === 0}>
            &#9664; Prev
          </button>
          <div className="restaurant-cards-container">
            {currentRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card-wrapper">
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
          <button className="carousel-button" onClick={nextPage} disabled={currentIndex === totalPages - 1}>
            Next &#9654;
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;