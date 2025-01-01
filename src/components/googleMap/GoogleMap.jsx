import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const GoogleMap = ({ location, onLocationChange }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const initialPosition = location.latitude
      ? {
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
        }
      : { lat: -17.3826, lng: -66.15562 };

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialPosition,
      zoom: 14,
    });

    const markerInstance = new window.google.maps.Marker({
      position: initialPosition,
      map: mapInstance,
      draggable: true,
    });

    markerInstance.addListener("dragend", (event) => {
      const { lat, lng } = event.latLng.toJSON();
      onLocationChange({ latitude: lat, longitude: lng });
    });

    markerRef.current = markerInstance;

    return () => {
      markerInstance.setMap(null);
    };
  }, [location.latitude, location.longitude, onLocationChange]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full border border-primary rounded-md"
    ></div>
  );
};

GoogleMap.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.string,
    longitude: PropTypes.string,
  }).isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default GoogleMap;
