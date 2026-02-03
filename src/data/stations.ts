import { Station } from '@/types/caltrain';

export const STATIONS: Station[] = [
  { id: 'SF', name: 'San Francisco', zone: 1, latitude: 37.7765, longitude: -122.3944 },
  { id: '22ND', name: '22nd Street', zone: 1, latitude: 37.7569, longitude: -122.3928 },
  { id: 'BAY', name: 'Bayshore', zone: 1, latitude: 37.7099, longitude: -122.4013 },
  { id: 'SB', name: 'South San Francisco', zone: 2, latitude: 37.6567, longitude: -122.4050 },
  { id: 'SSF', name: 'San Bruno', zone: 2, latitude: 37.6303, longitude: -122.4112 },
  { id: 'MIL', name: 'Millbrae', zone: 2, latitude: 37.5996, longitude: -122.3867 },
  { id: 'BRO', name: 'Broadway', zone: 2, latitude: 37.5874, longitude: -122.3623 },
  { id: 'BUR', name: 'Burlingame', zone: 2, latitude: 37.5792, longitude: -122.3450 },
  { id: 'SMT', name: 'San Mateo', zone: 2, latitude: 37.5681, longitude: -122.3238 },
  { id: 'HAY', name: 'Hayward Park', zone: 3, latitude: 37.5530, longitude: -122.3090 },
  { id: 'HIL', name: 'Hillsdale', zone: 3, latitude: 37.5376, longitude: -122.2966 },
  { id: 'BEL', name: 'Belmont', zone: 3, latitude: 37.5209, longitude: -122.2758 },
  { id: 'SMC', name: 'San Carlos', zone: 3, latitude: 37.5070, longitude: -122.2604 },
  { id: 'RWC', name: 'Redwood City', zone: 3, latitude: 37.4854, longitude: -122.2316 },
  { id: 'ATH', name: 'Atherton', zone: 3, latitude: 37.4632, longitude: -122.1975 },
  { id: 'MP', name: 'Menlo Park', zone: 3, latitude: 37.4543, longitude: -122.1822 },
  { id: 'PA', name: 'Palo Alto', zone: 3, latitude: 37.4430, longitude: -122.1643 },
  { id: 'CAL', name: 'California Ave', zone: 4, latitude: 37.4294, longitude: -122.1425 },
  { id: 'SA', name: 'San Antonio', zone: 4, latitude: 37.4070, longitude: -122.1072 },
  { id: 'MTV', name: 'Mountain View', zone: 4, latitude: 37.3944, longitude: -122.0757 },
  { id: 'SUN', name: 'Sunnyvale', zone: 4, latitude: 37.3784, longitude: -122.0308 },
  { id: 'LAW', name: 'Lawrence', zone: 4, latitude: 37.3702, longitude: -121.9967 },
  { id: 'SCL', name: 'Santa Clara', zone: 4, latitude: 37.3530, longitude: -121.9363 },
  { id: 'COL', name: 'College Park', zone: 5, latitude: 37.3425, longitude: -121.9148 },
  { id: 'DIRI', name: 'Diridon', zone: 5, latitude: 37.3297, longitude: -121.9026 },
  { id: 'TAM', name: 'Tamien', zone: 6, latitude: 37.3113, longitude: -121.8844 },
  { id: 'CAP', name: 'Capitol', zone: 6, latitude: 37.2900, longitude: -121.8422 },
  { id: 'BLO', name: 'Blossom Hill', zone: 6, latitude: 37.2526, longitude: -121.7982 },
  { id: 'MOR', name: 'Morgan Hill', zone: 6, latitude: 37.1296, longitude: -121.6506 },
  { id: 'GIL', name: 'Gilroy', zone: 6, latitude: 37.0034, longitude: -121.5667 },
];

export const getStationById = (id: string): Station | undefined => {
  return STATIONS.find(station => station.id === id);
};

export const getStationName = (id: string): string => {
  return getStationById(id)?.name || id;
};
