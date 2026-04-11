import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import { Poubelle } from '../types';
import { ActionIcon, Text, Badge, Stack } from '@mantine/core';
// On peut utiliser des icones de tabler-icons si installées, ou juste un div coloré.
// Pour faire simple et joli : un cercle coloré.

interface BinMarkerProps {
  bin: Poubelle;
  onClick: () => void;
}

const BinMarker: React.FC<BinMarkerProps> = ({ bin, onClick }) => {
  const [showPopup, setShowPopup] = React.useState(false);

  const remplissage = bin.last_lecture?.remplissage_pct ?? 0;
  const batterie = bin.last_lecture?.batterie_V ?? 0;

  let color = 'green';
  if (remplissage > 80) color = 'red';
  else if (remplissage > 50) color = 'orange';

  return (
    <>
      <Marker
        latitude={bin.latitude}
        longitude={bin.longitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowPopup(true);
          onClick();
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            backgroundColor: color,
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold'
          }}
        >
          {remplissage}%
        </div>
      </Marker>

      {showPopup && (
        <Popup
          latitude={bin.latitude}
          longitude={bin.longitude}
          anchor="top"
          onClose={() => setShowPopup(false)}
          closeOnClick={false}
        >
          <Stack gap="xs" p="xs">
            <Text fw={700} size="sm">{bin.nom}</Text>
            <Badge color={color}>{remplissage}% Rempli</Badge>
            <Text size="xs" c="dimmed">Batterie: {batterie}V</Text>
            <Text size="xs" c="dimmed">ID: {bin.device_id}</Text>
          </Stack>
        </Popup>
      )}
    </>
  );
};

export default BinMarker;
