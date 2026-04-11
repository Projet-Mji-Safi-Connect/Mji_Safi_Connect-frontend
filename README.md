# 🗑️ Mji Safi Connect — Frontend

> **Tableau de bord intelligent pour la gestion optimisée des déchets à Goma, RD Congo**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Mapbox](https://img.shields.io/badge/Mapbox_GL-3.16-000000?logo=mapbox&logoColor=white)](https://www.mapbox.com/)
[![Mantine](https://img.shields.io/badge/Mantine-8.3-339AF0?logo=mantine&logoColor=white)](https://mantine.dev/)

---

## 📋 Table des matières

- [Présentation du projet](#-présentation-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture technique](#-architecture-technique)
- [Stack technologique](#-stack-technologique)
- [Structure du projet](#-structure-du-projet)
- [Prérequis](#-prérequis)
- [Installation & Démarrage](#-installation--démarrage)
- [Configuration](#-configuration)
- [Endpoints API Backend](#-endpoints-api-backend)
- [Composants principaux](#-composants-principaux)
- [Gestion de l'état (Zustand)](#-gestion-de-létat-zustand)
- [Scripts disponibles](#-scripts-disponibles)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## 🌍 Présentation du projet

**Mji Safi Connect** (« Ville Propre Connectée » en Swahili) est un système IoT complet de gestion intelligente des déchets urbains, déployé dans la ville de **Goma** (Nord-Kivu, RD Congo).

Ce dépôt contient le **frontend** de l'application — un tableau de bord cartographique en temps réel qui permet aux opérateurs municipaux et aux gestionnaires de collecte de :

- 📍 **Visualiser** l'état de remplissage de toutes les poubelles connectées sur une carte interactive
- 🔴 **Identifier** les urgences (poubelles pleines, batteries faibles des capteurs)
- 🚛 **Calculer** l'itinéraire de collecte optimal grâce à l'API Mapbox Optimization
- 📊 **Consulter** les métriques de performance (distance totale, durée estimée)

L'objectif est de **réduire la consommation de carburant**, **optimiser le temps de collecte** et **améliorer la salubrité** de la ville en évitant les débordements de poubelles.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🗺️ **Carte interactive** | Carte Mapbox centrée sur Goma avec contrôles de navigation (zoom, rotation) |
| 📍 **Marqueurs dynamiques** | Chaque poubelle est représentée par un marqueur coloré selon son taux de remplissage (🟢 < 50%, 🟠 50-80%, 🔴 > 80%) |
| 💬 **Popups d'information** | Clic sur un marqueur pour voir : nom, remplissage (%), batterie (V), ID capteur |
| 🔄 **Mise à jour en temps réel** | Polling automatique toutes les 30 secondes pour rafraîchir les données des capteurs |
| 🚛 **Calcul de tournée optimale** | Algorithme d'optimisation pour déterminer le meilleur itinéraire de collecte |
| 📏 **Statistiques de tournée** | Affichage de la distance totale (km) et de la durée estimée (h/min) |
| 🛣️ **Tracé de route** | Visualisation de l'itinéraire optimal directement sur la carte (ligne bleue) |
| 📱 **Interface responsive** | Layout adaptatif avec panneau latéral et carte plein écran |

---

## 🏗️ Architecture technique

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Ce dépôt)                      │
│                                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌────────────────────────┐ │
│  │ Sidebar  │    │  MapContainer │    │   Zustand Store        │ │
│  │ (Contrôle│◄──►│  (Carte)     │◄──►│   (État global)        │ │
│  │  & Stats)│    │              │    │   - bins[]              │ │
│  └──────────┘    │  ┌─────────┐ │    │   - optimalRoute       │ │
│                  │  │BinMarker│ │    │   - routeStats          │ │
│                  │  └─────────┘ │    │   - isLoading...        │ │
│                  │  ┌─────────┐ │    └───────────┬────────────┘ │
│                  │  │RouteLayer│ │                │              │
│                  │  └─────────┘ │                │              │
│                  └──────────────┘                │              │
│                                                  │ axios        │
└──────────────────────────────────────────────────┼──────────────┘
                                                   │
                                    ┌──────────────▼──────────────┐
                                    │     BACKEND API (FastAPI)    │
                                    │  /api/v1/poubelles           │
                                    │  /api/v1/tournee/optimale    │
                                    │  Port: 8000                  │
                                    └──────────────┬──────────────┘
                                                   │
                                    ┌──────────────▼──────────────┐
                                    │     Base de données +        │
                                    │     Capteurs IoT (Hardware)  │
                                    └─────────────────────────────┘
```

---

## 🛠️ Stack technologique

| Technologie | Version | Rôle |
|---|---|---|
| **React** | 19.2 | Framework UI — rendu déclaratif des composants |
| **TypeScript** | 5.9 | Typage statique pour une meilleure maintenabilité |
| **Vite** | 7.2 | Bundler ultra-rapide avec HMR (Hot Module Replacement) |
| **Mapbox GL JS** | 3.16 | Moteur de rendu cartographique WebGL |
| **react-map-gl** | 8.1 | Wrapper React pour Mapbox GL JS |
| **Mantine** | 8.3 | Bibliothèque de composants UI (boutons, popups, layout) |
| **Zustand** | 5.0 | Gestion d'état global légère et performante |
| **Axios** | 1.13 | Client HTTP pour les appels API |
| **PostCSS** | 8.5 | Post-processeur CSS (avec preset Mantine) |
| **ESLint** | 9.39 | Linter pour la qualité du code |

---

## 📁 Structure du projet

```
Mji_Safi_Connect-frontend/
├── public/
│   └── vite.svg                    # Favicon
├── src/
│   ├── assets/                     # Ressources statiques (images, icônes)
│   ├── components/
│   │   ├── MapContainer.tsx        # 🗺️  Composant principal — carte Mapbox
│   │   ├── BinMarker.tsx           # 📍  Marqueur de poubelle (coloré + popup)
│   │   ├── RouteLayer.tsx          # 🛣️  Couche GeoJSON pour l'itinéraire
│   │   └── Sidebar.tsx             # 📊  Panneau latéral (bouton + stats)
│   ├── hooks/
│   │   └── useBins.ts              # 🔄  Hook de chargement des poubelles (polling)
│   ├── store/
│   │   └── useAppStore.ts          # 🏪  Store Zustand — état global de l'app
│   ├── App.tsx                     # 🏠  Layout principal (AppShell Mantine)
│   ├── App.css                     # 🎨  Styles spécifiques à App
│   ├── index.css                   # 🎨  Styles globaux (reset)
│   ├── main.tsx                    # 🚀  Point d'entrée React (MantineProvider)
│   └── types.ts                    # 📝  Interfaces TypeScript (Poubelle, Lecture, etc.)
├── .env                            # 🔑  Variables d'environnement (Token Mapbox)
├── .gitignore                      # 🚫  Fichiers ignorés par Git
├── eslint.config.js                # 🔍  Configuration ESLint
├── index.html                      # 📄  Page HTML racine (point d'entrée Vite)
├── package.json                    # 📦  Dépendances et scripts npm
├── postcss.config.cjs              # 🎨  Configuration PostCSS (Mantine)
├── tsconfig.json                   # ⚙️  Configuration TypeScript (racine)
├── tsconfig.app.json               # ⚙️  Configuration TypeScript (app)
├── tsconfig.node.json              # ⚙️  Configuration TypeScript (node/vite)
├── vite.config.ts                  # ⚡  Configuration Vite (proxy API, alias)
└── Guide_frontend.md               # 📖  Guide de spécifications techniques
```

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.x — [Télécharger ici](https://nodejs.org/)
- **npm** >= 9.x (inclus avec Node.js)
- **Git** — [Télécharger ici](https://git-scm.com/)
- Un **token Mapbox** — [Créer un compte gratuit](https://account.mapbox.com/auth/signup/)
- Le **backend Mji Safi Connect** en cours d'exécution sur `http://127.0.0.1:8000`

---

## 🚀 Installation & Démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/Projet-Mji-Safi-Connect/Mji_Safi_connect-frontend.git
cd Mji_Safi_connect-frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_MAPBOX_TOKEN=pk.eyJ1Ijoixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ **Important** : Remplacez la valeur par votre vrai token Mapbox. Vous pouvez l'obtenir gratuitement sur [mapbox.com](https://account.mapbox.com/access-tokens/).

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:5173** (port par défaut de Vite).

### 5. (Optionnel) Démarrer le backend

Le frontend nécessite le **backend API** pour fonctionner pleinement. Les requêtes vers `/api/*` sont automatiquement redirigées vers `http://127.0.0.1:8000` grâce au proxy Vite configuré dans `vite.config.ts`.

Consultez le dépôt du backend pour les instructions de démarrage.

---

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Obligatoire |
|---|---|---|
| `VITE_MAPBOX_TOKEN` | Token d'accès Mapbox pour le rendu cartographique | ✅ Oui |

### Proxy API (vite.config.ts)

Le serveur de développement Vite est configuré pour rediriger toutes les requêtes `/api/*` vers le backend :

```typescript
server: {
  proxy: {
    "/api": {
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
    },
  },
},
```

Pour changer l'URL du backend, modifiez la valeur de `target` dans `vite.config.ts`.

---

## 🔌 Endpoints API Backend

Le frontend communique avec le backend via deux endpoints principaux :

### `GET /api/v1/poubelles`

Récupère la liste de toutes les poubelles avec leurs dernières lectures capteur.

**Réponse attendue :**
```json
[
  {
    "id": 1,
    "nom": "ULPGL",
    "device_id": "sensor-001",
    "latitude": -1.6585,
    "longitude": 29.2205,
    "last_lecture": {
      "id": 10,
      "remplissage_pct": 85,
      "batterie_V": 4.1,
      "timestamp": "2026-04-11T10:00:00Z",
      "poubelle_id": 1
    }
  }
]
```

### `GET /api/v1/tournee/optimale`

Calcule l'itinéraire de collecte optimal pour les poubelles nécessitant un ramassage.

**Réponse attendue :**
```json
{
  "optimization_result": {
    "trips": [
      {
        "geometry": { "type": "LineString", "coordinates": [...] },
        "distance": 15200,
        "duration": 5400
      }
    ]
  },
  "poubelles_a_collecter": ["ULPGL", "Marché Central", "Birere"]
}
```

---

## 🧩 Composants principaux

### `MapContainer.tsx` — Carte interactive

Le composant central de l'application. Il :
- Initialise la carte Mapbox centrée sur **Goma** (lat: -1.6585, lng: 29.2205)
- Charge les données des poubelles via le hook `useBins()`
- Affiche un marqueur (`BinMarker`) pour chaque poubelle
- Dessine l'itinéraire optimal si disponible (`RouteLayer`)
- Gère l'absence de token Mapbox avec un message d'avertissement

### `BinMarker.tsx` — Marqueur de poubelle

Représente visuellement une poubelle sur la carte :
- **Couleur dynamique** selon le remplissage :
  - 🟢 **Vert** : < 50% (vide)
  - 🟠 **Orange** : 50-80% (à surveiller)
  - 🔴 **Rouge** : > 80% (critique, collecte nécessaire)
- **Popup au clic** : affiche le nom, le % de remplissage, la tension batterie et l'ID du capteur

### `RouteLayer.tsx` — Couche de route

Dessine l'itinéraire de collecte sur la carte :
- Utilise les composants `<Source>` et `<Layer>` de react-map-gl
- Ligne bleue épaisse (`#3b82f6`, largeur 5px) avec coins arrondis
- S'affiche uniquement quand une route optimale a été calculée

### `Sidebar.tsx` — Panneau de contrôle

Le centre de commande de l'opérateur :
- **Bouton "Calculer Tournée Optimale"** : lance l'appel API avec indicateur de chargement
- **Statistiques** : distance totale (km), durée estimée (h/min) — affichées après calcul
- **Liste des arrêts** : ordre de passage pour guider le chauffeur

---

## 🏪 Gestion de l'état (Zustand)

L'état global de l'application est géré par un store **Zustand** (`useAppStore.ts`) :

```typescript
interface AppState {
  // Données des poubelles
  bins: Poubelle[];           // Liste de toutes les poubelles
  isLoadingBins: boolean;     // Indicateur de chargement

  // Données de la tournée
  optimalRoute: any | null;   // GeoJSON de l'itinéraire optimal
  routeStats: RouteStats | null; // Distance & durée
  isLoadingRoute: boolean;    // Indicateur de calcul en cours

  // Actions
  fetchBins: () => Promise<void>;        // Charger les poubelles
  calculateRoute: () => Promise<void>;   // Calculer la tournée
}
```

### Interfaces TypeScript

```typescript
// Dernière lecture d'un capteur IoT
interface Lecture {
  id: number;
  remplissage_pct: number;  // Taux de remplissage (0-100%)
  batterie_V: number;       // Tension batterie (Volts)
  timestamp: string;        // Date/heure de la mesure
  poubelle_id: number;      // ID de la poubelle associée
}

// Poubelle connectée
interface Poubelle {
  id: number;
  nom: string;              // Nom/emplacement (ex: "ULPGL")
  device_id: string;        // ID du capteur IoT
  latitude: number;         // Coordonnée GPS
  longitude: number;        // Coordonnée GPS
  last_lecture?: Lecture;    // Dernière lecture capteur
}

// Statistiques de la tournée
interface RouteStats {
  total_distance_m: number; // Distance totale en mètres
  total_duration_s: number; // Durée totale en secondes
}
```

---

## 📜 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | 🚀 Démarre le serveur de développement Vite (HMR activé) |
| `npm run build` | 📦 Compile TypeScript puis génère le bundle de production dans `dist/` |
| `npm run preview` | 👀 Prévisualise le build de production localement |
| `npm run lint` | 🔍 Exécute ESLint pour vérifier la qualité du code |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. **Forkez** le dépôt
2. **Créez** une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```
3. **Committez** vos modifications :
   ```bash
   git commit -m "feat: ajout de ma nouvelle fonctionnalité"
   ```
4. **Poussez** la branche :
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```
5. **Ouvrez** une Pull Request

### Conventions de commit

Nous utilisons les [Conventional Commits](https://www.conventionalcommits.org/) :
- `feat:` — Nouvelle fonctionnalité
- `fix:` — Correction de bug
- `docs:` — Documentation
- `style:` — Formatage (pas de changement fonctionnel)
- `refactor:` — Refactorisation du code

---

## 👥 Équipe

**Projet Mji Safi Connect** — Gestion intelligente des déchets à Goma, RD Congo

---

## 📄 Licence

Ce projet est développé dans le cadre du programme **Mji Safi Connect**.

---

<p align="center">
  <strong>🌱 Mji Safi Connect — Pour une ville plus propre et plus connectée 🌱</strong>
</p>
