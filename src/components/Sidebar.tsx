import React from 'react';
import { Paper, Title, Button, Text, Stack, Group, Loader, List, ThemeIcon } from '@mantine/core';
import { useAppStore } from '../store/useAppStore';
// import { IconTruck, IconMapPin } from '@tabler/icons-react'; // Si on avait installé les icones

const Sidebar: React.FC = () => {
  const { calculateRoute, isLoadingRoute, routeStats, optimalRoute } = useAppStore();

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}min`;
  };

  const formatDistance = (meters: number) => {
    return `${(meters / 1000).toFixed(1)} km`;
  };

  return (
    <Paper shadow="md" p="md" style={{ width: 350, height: '100%', zIndex: 10, overflowY: 'auto' }}>
      <Stack gap="lg">
        <Title order={3}>Smart Waste Goma</Title>
        
        <Text size="sm" c="dimmed">
          Optimisation de la collecte des déchets pour réduire la consommation de carburant.
        </Text>

        <Button 
          onClick={calculateRoute} 
          loading={isLoadingRoute}
          fullWidth
          size="md"
          color="blue"
        >
          Calculer Tournée Optimale
        </Button>

        {routeStats && (
          <Paper withBorder p="sm" bg="gray.0">
            <Stack gap="xs">
              <Title order={5}>Résultats</Title>
              <Group justify="space-between">
                <Text size="sm">Distance :</Text>
                <Text fw={700}>{formatDistance(routeStats.total_distance_m)}</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Durée :</Text>
                <Text fw={700}>{formatDuration(routeStats.total_duration_s)}</Text>
              </Group>
            </Stack>
          </Paper>
        )}

        {optimalRoute && (
           <Stack gap="xs">
             <Title order={5}>Arrêts</Title>
             <List spacing="xs" size="sm" center>
               {/* Note: Mapbox Optimization API ne renvoie pas toujours les noms des arrêts dans l'ordre simple dans le GeoJSON.
                   Pour simplifier ici, on affiche juste un texte générique ou on devrait stocker l'ordre des IDs dans le store.
                   Le backend renvoie 'poubelles_a_collecter' mais on ne l'a pas stocké dans le store pour l'instant.
                   On va juste afficher une liste statique pour l'exemple ou améliorer le store plus tard.
               */}
               <List.Item>Dépôt (Départ)</List.Item>
               <List.Item>Points de collecte optimisés</List.Item>
               <List.Item>Dépôt (Arrivée)</List.Item>
             </List>
           </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default Sidebar;
