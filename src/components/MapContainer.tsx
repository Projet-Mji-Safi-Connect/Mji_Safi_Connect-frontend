import React from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import { useAppStore } from '../store/useAppStore';
import BinMarker from './BinMarker';
import RouteLayer from './RouteLayer';
import { useBins } from '../hooks/useBins';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapContainer: React.FC = () => {
  useBins(); // Fetch bins on mount
  const { bins, optimalRoute } = useAppStore();

  // Coordonnées de Goma par défaut
  const initialViewState = {
    latitude: -1.6585,
    longitude: 29.2205,
    zoom: 13
  };

  // Debug: Afficher les infos
  console.log('MAPBOX_TOKEN:', MAPBOX_TOKEN);
  console.log('Bins loaded:', bins);

  if (!MAPBOX_TOKEN || MAPBOX_TOKEN.includes('...')) {
    return (
      <div style={{ 
        padding: 40, 
        backgroundColor: '#fff3cd', 
        border: '2px solid #ffc107',
        borderRadius: 8,
        margin: 20 
      }}>
        <h2 style={{ color: '#856404', marginTop: 0 }}>⚠️ Configuration requise</h2>
        <p style={{ color: '#856404' }}>
          Le token Mapbox est manquant ou incomplet dans le fichier <code>.env</code>
        </p>
        <p style={{ color: '#856404' }}>
          Token actuel: <code>{MAPBOX_TOKEN || 'NON DÉFINI'}</code>
        </p>
        <ol style={{ color: '#856404', marginLeft: 20 }}>
          <li>Obtenez votre token sur <a href="https://mapbox.com" target="_blank">mapbox.com</a></li>
          <li>Remplacez la valeur dans <code>frontend/.env</code></li>
          <li>Relancez le serveur (<code>npm run dev</code>)</li>
        </ol>
        <p style={{ marginTop: 20, fontSize: 14, color: '#666' }}>
          Nombre de poubelles chargées: {bins.length}
        </p>
      </div>
    );
  }

  return (
    <Map
      initialViewState={initialViewState}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position="top-right" />

      {bins.map((bin) => (
        <BinMarker key={bin.id} bin={bin} onClick={() => console.log('Clicked', bin.nom)} />
      ))}

      <RouteLayer geojson={optimalRoute} />
    </Map>
  );
};

export default MapContainer;
