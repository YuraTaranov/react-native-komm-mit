export type TCoordinates = {
  latitude: number;
  longitude: number;
};
export interface TObjectLocation {
  coordinates: TCoordinates;
  address: string;
}
export interface TAudioTrack {
  id: '';
  title: '';
  description: '';
  path: '';
}
export interface TObject {
  id: string;
  title: string;
  description: string;
  cover: string | null;
  images: string[];
  location: TObjectLocation;
  order: number;
  audio: TAudioTrack[];
  video: string;
}
export interface TRoute {
  id: string;
  title: string;
  description: string;
  cover: string | null;
  color: string;
  yt_video_id: string;
  objects: TObject[];
}

export type TScreenNavigationType = 'navigate' | 'replace';

export type TRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type TMarker = {
  id: string;
  image: string;
  latitude: number;
  longitude: number;
};

export type TMapBoundaries = {
  northEast: TCoordinates;
  southWest: TCoordinates;
};

export type TCity = {
  id: string;
  name: string;
};
