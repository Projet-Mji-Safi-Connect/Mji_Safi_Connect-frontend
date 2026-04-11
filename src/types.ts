export interface Lecture {
  id: number;
  remplissage_pct: number;
  batterie_V: number;
  timestamp: string;
  poubelle_id: number;
}

export interface Poubelle {
  id: number;
  nom: string;
  device_id: string;
  latitude: number;
  longitude: number;
  last_lecture?: Lecture;
}

export interface RouteStats {
  total_distance_m: number;
  total_duration_s: number;
}

export interface OptimizationResponse {
  optimization_result: any; // Mapbox response
  poubelles_a_collecter: string[];
}
