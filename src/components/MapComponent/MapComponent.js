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
          onClick={() => setInfoVisible(!infoVisible)}
        />
        {infoVisible && restaurant && (
          <InfoWindow
            position={center}
            onCloseClick={() => setInfoVisible(false)}
          >
            <div>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.location.address1}</p>
              <p>{restaurant.phone}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;
