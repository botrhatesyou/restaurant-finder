import React, { useEffect, useState } from 'react';
import MapView from '../MapView/MapView';
import api from '../services/api.js';
import FilterAndSort from '../FilterAndSort/FilterAndSort';
import './MapPage.css'

const MapPage = () => {
  // State variables to store restaurants, map center, filters, sort option, and loading status
  const [restaurants, setRestaurants] = useState(null);
  const [center, setCenter] = useState(null);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('best_match');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch restaurants based on latitude, longitude, filters, and sort option
    const fetchRestaurants = async (latitude, longitude) => {
      setIsLoading(true);
      try {
        const response = await api.get('/restaurants', {
          params: {
            latitude: latitude,
            longitude: longitude,
            ...filters,
            sort_by: sort,
          },
        });
        setRestaurants(response.data.businesses);
        setCenter({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
      setIsLoading(false);
    };

    // Get user's current location and fetch restaurants
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchRestaurants(position.coords.latitude, position.coords.longitude);
      }, () => {
        // Fallback to default location if user denies permission or location cannot be determined
        fetchRestaurants(49.2827, -123.1207); // Vancouver center
      });
    } else {
      // Fallback to default location if geolocation is not supported
      fetchRestaurants(49.2827, -123.1207); // Vancouver center
    }
  }, [filters, sort]);

  // Update filters state when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Update sort state when sort option changes
  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <div>
      <h1>Taste the Neighborhood</h1>
      <p>Explore restaurants around your current location on the map below.</p>
      <FilterAndSort onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        restaurants && center ? <MapView restaurants={restaurants} center={center} /> : <p>Loading...</p>
      )}

      <footer className="mt-5 text-center">
        <p>&copy; 2023 Restaurant Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MapPage;
