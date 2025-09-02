import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export function MapComponent({ location, onLocationChange }) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
        <Marker
          position={location}
          draggable
          onDragEnd={(e) =>
            onLocationChange &&
            onLocationChange({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            })
          }
        />
      </GoogleMap>
    </LoadScript>
  );
}
