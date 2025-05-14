import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Import Leaflet's CSS
import 'leaflet/dist/leaflet.css';
// Import Leaflet library
import L from 'leaflet';
import styles from './MapSection.module.css';

// Fix for default marker icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapSection({ center, pin, zoom = 13 }) {
  // Add zoom prop
  return (
    <section className={styles.mapSection}>
      {/* Make sure the container has a defined height */}
      <div className={styles.mapContainer}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={pin}>
            <Popup>
              Avion Venue <br /> (Or your location name)
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
}

export default MapSection;
