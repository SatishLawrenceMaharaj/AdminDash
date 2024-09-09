"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const iconUrl = '/marker-icon.png';

// Configure the default marker icon
const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
  shadowAnchor: [12, 41], // the same as iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

// Define a custom hook to set the map center
const SetMapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

type MapProps = {
  center: [number, number];
};

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
      <SetMapCenter center={center} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>User Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
