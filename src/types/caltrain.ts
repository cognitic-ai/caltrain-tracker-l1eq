export interface Station {
  id: string;
  name: string;
  zone: number;
  latitude: number;
  longitude: number;
}

export interface Stop {
  stationId: string;
  arrivalTime: string;
  departureTime: string;
}

export interface Trip {
  id: string;
  name: string;
  direction: 'NB' | 'SB'; // Northbound or Southbound
  type: 'Local' | 'Limited' | 'Express';
  stops: Stop[];
}

export type Direction = 'NB' | 'SB';
export type TripType = 'Local' | 'Limited' | 'Express';
