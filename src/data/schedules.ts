import { Trip, Stop } from '@/types/caltrain';

// Sample weekday southbound schedule
const createTrip = (
  id: string,
  name: string,
  direction: 'NB' | 'SB',
  type: 'Local' | 'Limited' | 'Express',
  stops: Stop[]
): Trip => ({
  id,
  name,
  direction,
  type,
  stops,
});

// Southbound trips (SF to Gilroy)
export const SOUTHBOUND_TRIPS: Trip[] = [
  createTrip('SB101', '101', 'SB', 'Local', [
    { stationId: 'SF', arrivalTime: '06:00', departureTime: '06:00' },
    { stationId: '22ND', arrivalTime: '06:05', departureTime: '06:06' },
    { stationId: 'BAY', arrivalTime: '06:12', departureTime: '06:13' },
    { stationId: 'SB', arrivalTime: '06:20', departureTime: '06:21' },
    { stationId: 'SSF', arrivalTime: '06:26', departureTime: '06:27' },
    { stationId: 'MIL', arrivalTime: '06:33', departureTime: '06:34' },
    { stationId: 'BUR', arrivalTime: '06:40', departureTime: '06:41' },
    { stationId: 'SMT', arrivalTime: '06:46', departureTime: '06:47' },
    { stationId: 'HIL', arrivalTime: '06:53', departureTime: '06:54' },
    { stationId: 'RWC', arrivalTime: '07:02', departureTime: '07:03' },
    { stationId: 'MP', arrivalTime: '07:09', departureTime: '07:10' },
    { stationId: 'PA', arrivalTime: '07:15', departureTime: '07:16' },
    { stationId: 'CAL', arrivalTime: '07:20', departureTime: '07:21' },
    { stationId: 'MTV', arrivalTime: '07:30', departureTime: '07:31' },
    { stationId: 'SUN', arrivalTime: '07:38', departureTime: '07:39' },
    { stationId: 'SCL', arrivalTime: '07:48', departureTime: '07:49' },
    { stationId: 'DIRI', arrivalTime: '07:55', departureTime: '07:56' },
    { stationId: 'TAM', arrivalTime: '08:02', departureTime: '08:02' },
  ]),
  createTrip('SB103', '103', 'SB', 'Limited', [
    { stationId: 'SF', arrivalTime: '07:00', departureTime: '07:00' },
    { stationId: '22ND', arrivalTime: '07:05', departureTime: '07:06' },
    { stationId: 'MIL', arrivalTime: '07:25', departureTime: '07:26' },
    { stationId: 'SMT', arrivalTime: '07:35', departureTime: '07:36' },
    { stationId: 'HIL', arrivalTime: '07:42', departureTime: '07:43' },
    { stationId: 'RWC', arrivalTime: '07:50', departureTime: '07:51' },
    { stationId: 'PA', arrivalTime: '07:59', departureTime: '08:00' },
    { stationId: 'MTV', arrivalTime: '08:10', departureTime: '08:11' },
    { stationId: 'SUN', arrivalTime: '08:18', departureTime: '08:19' },
    { stationId: 'DIRI', arrivalTime: '08:32', departureTime: '08:32' },
  ]),
  createTrip('SB135', '135', 'SB', 'Express', [
    { stationId: 'SF', arrivalTime: '08:00', departureTime: '08:00' },
    { stationId: 'MIL', arrivalTime: '08:20', departureTime: '08:21' },
    { stationId: 'HIL', arrivalTime: '08:30', departureTime: '08:31' },
    { stationId: 'RWC', arrivalTime: '08:38', departureTime: '08:39' },
    { stationId: 'PA', arrivalTime: '08:46', departureTime: '08:47' },
    { stationId: 'MTV', arrivalTime: '08:56', departureTime: '08:57' },
    { stationId: 'SUN', arrivalTime: '09:04', departureTime: '09:05' },
    { stationId: 'DIRI', arrivalTime: '09:17', departureTime: '09:17' },
  ]),
  createTrip('SB205', '205', 'SB', 'Local', [
    { stationId: 'SF', arrivalTime: '09:30', departureTime: '09:30' },
    { stationId: '22ND', arrivalTime: '09:35', departureTime: '09:36' },
    { stationId: 'BAY', arrivalTime: '09:42', departureTime: '09:43' },
    { stationId: 'SB', arrivalTime: '09:50', departureTime: '09:51' },
    { stationId: 'SSF', arrivalTime: '09:56', departureTime: '09:57' },
    { stationId: 'MIL', arrivalTime: '10:03', departureTime: '10:04' },
    { stationId: 'BUR', arrivalTime: '10:10', departureTime: '10:11' },
    { stationId: 'SMT', arrivalTime: '10:16', departureTime: '10:17' },
    { stationId: 'HIL', arrivalTime: '10:23', departureTime: '10:24' },
    { stationId: 'RWC', arrivalTime: '10:32', departureTime: '10:33' },
    { stationId: 'MP', arrivalTime: '10:39', departureTime: '10:40' },
    { stationId: 'PA', arrivalTime: '10:45', departureTime: '10:46' },
    { stationId: 'CAL', arrivalTime: '10:50', departureTime: '10:51' },
    { stationId: 'MTV', arrivalTime: '11:00', departureTime: '11:01' },
    { stationId: 'SUN', arrivalTime: '11:08', departureTime: '11:09' },
    { stationId: 'SCL', arrivalTime: '11:18', departureTime: '11:19' },
    { stationId: 'DIRI', arrivalTime: '11:25', departureTime: '11:26' },
    { stationId: 'TAM', arrivalTime: '11:32', departureTime: '11:32' },
  ]),
];

// Northbound trips (Gilroy to SF)
export const NORTHBOUND_TRIPS: Trip[] = [
  createTrip('NB102', '102', 'NB', 'Local', [
    { stationId: 'TAM', arrivalTime: '06:30', departureTime: '06:30' },
    { stationId: 'DIRI', arrivalTime: '06:36', departureTime: '06:37' },
    { stationId: 'SCL', arrivalTime: '06:44', departureTime: '06:45' },
    { stationId: 'SUN', arrivalTime: '06:54', departureTime: '06:55' },
    { stationId: 'MTV', arrivalTime: '07:02', departureTime: '07:03' },
    { stationId: 'CAL', arrivalTime: '07:12', departureTime: '07:13' },
    { stationId: 'PA', arrivalTime: '07:17', departureTime: '07:18' },
    { stationId: 'MP', arrivalTime: '07:23', departureTime: '07:24' },
    { stationId: 'RWC', arrivalTime: '07:30', departureTime: '07:31' },
    { stationId: 'HIL', arrivalTime: '07:39', departureTime: '07:40' },
    { stationId: 'SMT', arrivalTime: '07:46', departureTime: '07:47' },
    { stationId: 'BUR', arrivalTime: '07:52', departureTime: '07:53' },
    { stationId: 'MIL', arrivalTime: '07:59', departureTime: '08:00' },
    { stationId: 'SSF', arrivalTime: '08:06', departureTime: '08:07' },
    { stationId: 'SB', arrivalTime: '08:12', departureTime: '08:13' },
    { stationId: 'BAY', arrivalTime: '08:20', departureTime: '08:21' },
    { stationId: '22ND', arrivalTime: '08:27', departureTime: '08:28' },
    { stationId: 'SF', arrivalTime: '08:33', departureTime: '08:33' },
  ]),
  createTrip('NB104', '104', 'NB', 'Limited', [
    { stationId: 'DIRI', arrivalTime: '07:15', departureTime: '07:15' },
    { stationId: 'SUN', arrivalTime: '07:26', departureTime: '07:27' },
    { stationId: 'MTV', arrivalTime: '07:34', departureTime: '07:35' },
    { stationId: 'PA', arrivalTime: '07:45', departureTime: '07:46' },
    { stationId: 'RWC', arrivalTime: '07:54', departureTime: '07:55' },
    { stationId: 'HIL', arrivalTime: '08:02', departureTime: '08:03' },
    { stationId: 'SMT', arrivalTime: '08:09', departureTime: '08:10' },
    { stationId: 'MIL', arrivalTime: '08:20', departureTime: '08:21' },
    { stationId: '22ND', arrivalTime: '08:40', departureTime: '08:41' },
    { stationId: 'SF', arrivalTime: '08:46', departureTime: '08:46' },
  ]),
  createTrip('NB136', '136', 'NB', 'Express', [
    { stationId: 'DIRI', arrivalTime: '08:00', departureTime: '08:00' },
    { stationId: 'SUN', arrivalTime: '08:11', departureTime: '08:12' },
    { stationId: 'MTV', arrivalTime: '08:19', departureTime: '08:20' },
    { stationId: 'PA', arrivalTime: '08:29', departureTime: '08:30' },
    { stationId: 'RWC', arrivalTime: '08:37', departureTime: '08:38' },
    { stationId: 'HIL', arrivalTime: '08:45', departureTime: '08:46' },
    { stationId: 'MIL', arrivalTime: '08:55', departureTime: '08:56' },
    { stationId: 'SF', arrivalTime: '09:16', departureTime: '09:16' },
  ]),
  createTrip('NB206', '206', 'NB', 'Local', [
    { stationId: 'TAM', arrivalTime: '10:00', departureTime: '10:00' },
    { stationId: 'DIRI', arrivalTime: '10:06', departureTime: '10:07' },
    { stationId: 'SCL', arrivalTime: '10:14', departureTime: '10:15' },
    { stationId: 'SUN', arrivalTime: '10:24', departureTime: '10:25' },
    { stationId: 'MTV', arrivalTime: '10:32', departureTime: '10:33' },
    { stationId: 'CAL', arrivalTime: '10:42', departureTime: '10:43' },
    { stationId: 'PA', arrivalTime: '10:47', departureTime: '10:48' },
    { stationId: 'MP', arrivalTime: '10:53', departureTime: '10:54' },
    { stationId: 'RWC', arrivalTime: '11:00', departureTime: '11:01' },
    { stationId: 'HIL', arrivalTime: '11:09', departureTime: '11:10' },
    { stationId: 'SMT', arrivalTime: '11:16', departureTime: '11:17' },
    { stationId: 'BUR', arrivalTime: '11:22', departureTime: '11:23' },
    { stationId: 'MIL', arrivalTime: '11:29', departureTime: '11:30' },
    { stationId: 'SSF', arrivalTime: '11:36', departureTime: '11:37' },
    { stationId: 'SB', arrivalTime: '11:42', departureTime: '11:43' },
    { stationId: 'BAY', arrivalTime: '11:50', departureTime: '11:51' },
    { stationId: '22ND', arrivalTime: '11:57', departureTime: '11:58' },
    { stationId: 'SF', arrivalTime: '12:03', departureTime: '12:03' },
  ]),
];

export const getAllTrips = (): Trip[] => {
  return [...SOUTHBOUND_TRIPS, ...NORTHBOUND_TRIPS];
};

export const getTripsByDirection = (direction: 'NB' | 'SB'): Trip[] => {
  return direction === 'NB' ? NORTHBOUND_TRIPS : SOUTHBOUND_TRIPS;
};

export const getTripById = (id: string): Trip | undefined => {
  return getAllTrips().find(trip => trip.id === id);
};
