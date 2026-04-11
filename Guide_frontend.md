# Spécifications du Frontend - Projet Smart Waste Goma

Ce document détaille l'architecture, les composants et les flux de données de l'application frontend (Dashboard) pour le projet de gestion de déchets optimisée.

**Stack Technique :**
* **Framework :** React 18+
* **Language :** TypeScript
* **Cartographie :** Mapbox GL JS (implémenté via `react-map-gl`)
* **Client HTTP :** `axios`
* **Gestion d'état (State Management) :** `Zustand` ou `React Context` (Zustand est plus simple pour gérer l'état global, ex: la route)
* **Composants UI :** `Mantine` ou `Chakra UI` (pour avoir des composants prêts à l'emploi : boutons, popups, etc.)

---

## 1. Objectif du Frontend

Le frontend est le **tableau de bord de contrôle** de l'opération. Il doit permettre à un opérateur (un gestionnaire de la ville ou de la collecte) de :

1.  **Visualiser** l'état de remplissage de toutes les poubelles en temps réel sur une carte de Goma.
2.  **Identifier** les problèmes urgents (poubelles pleines, batteries faibles).
3.  **Calculer** et **afficher** l'itinéraire de collecte optimisé (la tournée des camions) pour économiser le carburant.
4.  **Consulter** les métriques de performance (distance, durée de la tournée).

---

## 2. Architecture des Composants (Vue d'ensemble)

Le projet sera structuré autour de composants logiques et réutilisables.

src/ ├── components/ │ ├── MapContainer.tsx # Le composant principal (la carte) │ ├── BinMarker.tsx # Le marqueur de poubelle (rouge/vert) │ ├── RouteLayer.tsx # La couche qui dessine la route │ └── Sidebar.tsx # Le panneau de contrôle (boutons, stats) ├── hooks/ │ └── useBins.ts # Hook pour fetcher les données des poubelles ├── store/ │ └── useAppStore.ts # Store (Zustand) pour l'état global └── App.tsx # Layout principal


---

## 3. Détail des Fonctionnalités à Implémenter

### A. Le Conteneur de la Carte (`MapContainer.tsx`)

C'est le cœur de l'application.

* **Tâche 1 : Initialisation de la carte**
    * Implémenter `react-map-gl`.
    * Centrer la vue initiale sur **Goma** (utiliser les bonnes coordonnées GPS).
    * Inclure votre `MAPBOX_TOKEN` (côté client).

* **Tâche 2 : Récupération des données**
    * Au montage du composant (`useEffect`), faire un appel `axios` à l'endpoint backend : `GET /api/v1/poubelles`.
    * Stocker la liste des poubelles reçues dans l'état global (Zustand).

* **Tâche 3 : Affichage des Marqueurs**
    * "Mapper" (boucler) sur la liste des poubelles depuis l'état.
    * Pour chaque poubelle, rendre un composant `<BinMarker />` à ses `latitude` et `longitude`.

* **Tâche 4 : Affichage de la Route**
    * Ce composant doit lire l'état `optimalRoute` (du store Zustand).
    * Si `optimalRoute` n'est pas nul, rendre le composant `<RouteLayer geojson={optimalRoute} />`.

### B. Le Marqueur de Poubelle (`BinMarker.tsx`)

Ce composant affiche un point sur la carte.

* **Tâche 1 : Rendu Visuel (Props)**
    * Le composant doit accepter des props : `remplissage: number`, `batterie: number`.
    * **Logique de Couleur :** Implémenter une fonction qui change la couleur du marqueur :
        * `remplissage > 80%` ➔ **Rouge** (critique)
        * `remplissage > 50%` ➔ **Orange** (à surveiller)
        * `sinon` ➔ **Vert** (vide)

* **Tâche 2 : Popup d'Information**
    * Utiliser le composant `<Popup>` de `react-map-gl`.
    * Au clic sur le marqueur, afficher le popup.
    * Le popup doit montrer les détails : "Remplissage : 85%", "Batterie : 4.1V".

### C. La Couche de Route (`RouteLayer.tsx`)

Ce composant dessine le chemin du camion.

* **Tâche 1 : Rendu Mapbox (Props)**
    * Le composant reçoit un prop : `geojson: GeoJSON.Feature`.
    * **Logique :** Utiliser les composants `<Source>` et `<Layer>` de `react-map-gl` pour dessiner le `geojson` reçu.
    * Styler la ligne : la faire épaisse, bleue, pour qu'elle soit bien visible sur la carte.

### D. Le Panneau Latéral (`Sidebar.tsx`)

C'est le centre de commande de l'utilisateur.

* **Tâche 1 : Le Bouton d'Action**
    * Implémenter un bouton : "Calculer la Tournée Optimale".
    * **Logique `onClick` :**
        1.  Mettre l'état `isLoadingRoute` (dans Zustand) à `true`.
        2.  Appeler l'endpoint backend : `GET /api/v1/tournee/optimale`.
        3.  À la réception de la réponse, mettre à jour le store Zustand avec :
            * `setOptimalRoute(response.data.route_geojson)`
            * `setRouteStats(response.data.total_distance_m, ...)`
        4.  Mettre `isLoadingRoute` à `false`.

* **Tâche 2 : Le Panneau de Statistiques**
    * Afficher les données reçues de l'appel `/tournee/optimale`.
    * Exemple : "Distance Totale : **15.2 km**", "Durée Estimée : **1h 30min**". (N'oubliez pas de convertir les mètres en km et les secondes en heures/minutes).

* **Tâche 3 : La Liste des Arrêts**
    * Afficher la liste ordonnée des arrêts (reçue de `response.data.stops_order`) pour guider le chauffeur.
    * Ex: "1. ULPGL", "2. Marché Central", "3. ...".

---

## 4. Gestion de l'État Global (`store/useAppStore.ts`)

Un store `Zustand` (ou `React Context`) est nécessaire pour partager l'état entre le `Sidebar` (qui demande la route) et le `MapContainer` (qui l'affiche).

**État requis :**

```typescript
interface AppState {
  // Données des poubelles
  bins: PoubelleReadWithLast[]; // Le type doit correspondre à l'API
  isLoadingBins: boolean;
  
  // Données de la tournée
  optimalRoute: GeoJSON.Feature | null;
  routeStats: { distance: number; duration: number; } | null;
  isLoadingRoute: boolean;

  // Actions
  fetchBins: () => Promise<void>;
  calculateRoute: () => Promise<void>;
}