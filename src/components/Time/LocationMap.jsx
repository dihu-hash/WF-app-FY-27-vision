import React from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { currentJob } from '../../data/mockData';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationMap = () => {
  const center = [
    (currentJob.coordinates.lat + currentJob.workCoordinates.lat) / 2,
    (currentJob.coordinates.lng + currentJob.workCoordinates.lng) / 2
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ height: '250px' }}>
      <MapContainer 
        center={center} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Current location (dark dot) */}
        <CircleMarker
          center={[currentJob.coordinates.lat, currentJob.coordinates.lng]}
          radius={8}
          fillColor="#1e293b"
          color="#1e293b"
          weight={2}
          opacity={1}
          fillOpacity={1}
        >
          <Popup>Your Location</Popup>
        </CircleMarker>

        {/* Work location (red marker) */}
        <Marker 
          position={[currentJob.workCoordinates.lat, currentJob.workCoordinates.lng]}
          icon={redIcon}
        >
          <Popup>
            <div className="text-sm">
              <strong>{currentJob.customer}</strong>
              <br />
              {currentJob.location}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
