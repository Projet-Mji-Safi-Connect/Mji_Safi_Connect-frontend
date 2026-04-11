import { create } from 'zustand';
import axios from 'axios';
import { Poubelle, RouteStats } from '../types';

interface AppState {
  bins: Poubelle[];
  isLoadingBins: boolean;
  
  optimalRoute: any | null; // GeoJSON
  routeStats: RouteStats | null;
  isLoadingRoute: boolean;
  
  fetchBins: () => Promise<void>;
  calculateRoute: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  bins: [],
  isLoadingBins: false,
  optimalRoute: null,
  routeStats: null,
  isLoadingRoute: false,

  fetchBins: async () => {
    set({ isLoadingBins: true });
    try {
      const response = await axios.get('/api/v1/poubelles');
      set({ bins: response.data });
    } catch (error) {
      console.error("Failed to fetch bins", error);
    } finally {
      set({ isLoadingBins: false });
    }
  },

  calculateRoute: async () => {
    set({ isLoadingRoute: true });
    try {
      const response = await axios.get('/api/v1/tournee/optimale');
      // La réponse du backend est: { optimization_result: {...}, poubelles_a_collecter: [...] }
      // Mapbox Optimization API renvoie un objet avec 'trips' qui contient la géométrie.
      // On suppose que le backend renvoie directement le résultat de Mapbox dans 'optimization_result'.
      
      const result = response.data.optimization_result;
      
      if (result && result.trips && result.trips.length > 0) {
        const trip = result.trips[0];
        set({ 
          optimalRoute: trip.geometry,
          routeStats: {
            total_distance_m: trip.distance,
            total_duration_s: trip.duration
          }
        });
      } else {
          // Pas de route (pas de poubelles pleines ou erreur)
          set({ optimalRoute: null, routeStats: null });
          alert("Aucune tournée nécessaire ou impossible de calculer.");
      }
      
    } catch (error) {
      console.error("Failed to calculate route", error);
      alert("Erreur lors du calcul de la tournée.");
    } finally {
      set({ isLoadingRoute: false });
    }
  }
}));
