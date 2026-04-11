import React from 'react';
import { Source, Layer } from 'react-map-gl';

interface RouteLayerProps {
  geojson: any; // GeoJSON.Feature
}

const RouteLayer: React.FC<RouteLayerProps> = ({ geojson }) => {
  if (!geojson) return null;

  return (
    <Source id="route-source" type="geojson" data={geojson}>
      <Layer
        id="route-layer"
        type="line"
        layout={{
          'line-join': 'round',
          'line-cap': 'round'
        }}
        paint={{
          'line-color': '#3b82f6', // Blue
          'line-width': 5,
          'line-opacity': 0.8
        }}
      />
    </Source>
  );
};

export default RouteLayer;
