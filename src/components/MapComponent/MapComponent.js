import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Define the style for the map container
const containerStyle = {
  width: '100%',
  height: '400px'
};

// MapComponent receives latitude and longitude as props and renders a Google Map centered at that location
function MapComponent({ lat, lng }) {
  // Define the center of the map using the received latitude and longitude
  const center = {
    lat: lat,
    lng: lng
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    // LoadScript component loads the Google Maps JavaScript API
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      {/* GoogleMap component renders the map */}
      <GoogleMap
        mapContainerStyle={containerStyle} // Apply the container style
        center={center} // Set the center of the map
        zoom={15} // Set the zoom level
      >
        {/* Marker component adds a marker at the center of the map */}
        <Marker position={center} zIndex={999} />
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;
