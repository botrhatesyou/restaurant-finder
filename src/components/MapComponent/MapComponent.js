import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MapComponent({ lat, lng, restaurant }) {
  const center = {
    lat: lat,
    lng: lng
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // State to track the visibility of the InfoWindow
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker
          position={center}
          zIndex={999}
          onClick={() => setInfoVisible(!infoVisible)} // Toggle the visibility of the InfoWindow
        />
        {infoVisible && (
          <InfoWindow
            position={center}
            onCloseClick={() => setInfoVisible(false)} // Hide the InfoWindow when the close button is clicked
          >
            <div>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address}</p>
              <p>{restaurant.phone}</p>
              <p>{restaurant.rating}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;
