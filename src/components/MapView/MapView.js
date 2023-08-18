import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapView = ({ restaurants, center }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Handle map click to close InfoWindow
  const handleMapClick = () => {
    setSelectedRestaurant(null);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={center}
        zoom={14}
        mapContainerStyle={{ width: '100%', height: '500px' }}
        onClick={handleMapClick}
      >
        {/* Render markers for each restaurant */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={{ lat: restaurant.coordinates.latitude, lng: restaurant.coordinates.longitude }}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))}
        {/* Render InfoWindow for selected restaurant */}
        {selectedRestaurant && (
          <InfoWindow
            position={{ lat: selectedRestaurant.coordinates.latitude, lng: selectedRestaurant.coordinates.longitude }}
            onCloseClick={() => setSelectedRestaurant(null)}
          >
            <div>
              <h4>{selectedRestaurant.name}</h4>
              <p>{selectedRestaurant.location.address1}</p>
              <p>Rating: {selectedRestaurant.rating} ⭐</p>
              <p>Price: {selectedRestaurant.price}</p>
              <img src={selectedRestaurant.image_url} alt={selectedRestaurant.name} width="100" />
              <br />
              <a href={`/restaurant/${selectedRestaurant.id}`}>View Details</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
