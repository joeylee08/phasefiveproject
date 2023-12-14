// npm install @react-google-maps/api use-places-autocomplete

import {React, useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Map = ({center, items}) => {
  const [centerCoords, setCenterCoords] = useState({})
  const [geocoder, setGeocoder] = useState(null)

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDQ_T0IBMGJKmVeSYD8BnHxIgmnkAqPM2E',
    items
  });

  const handleSetCoords = (center) => { 
    console.log('center',center)
    if (!isLoaded) return;
    if (!geocoder) return;

    geocoder.geocode({'address': center}, (results, status) => {
      if (status === "OK") {
        const coords = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
        setCenterCoords(coords)
        return coords;
      }
    })
  }

  useEffect(() => {
    if (window.google) {
      setGeocoder(new window.google.maps.Geocoder())
    }
  }, [window.google]) 

  useEffect(() => {
    if (geocoder) {
      handleSetCoords(center)
    }
  }, [geocoder])

 

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className='map'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={centerCoords}
      >
        <Marker position={centerCoords} />
      </GoogleMap>
    </div>
  );
};

export default Map;