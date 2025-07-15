// import { Room } from '../models/room.model';
// import { Booking } from '../models/booking.model';

// export const MOCK_ROOMS: Room[] = [
//   { id: 1, name: 'Cedar Room', capacity: 10, features: ['Projector', 'Whiteboard'], availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
//   { id: 2, name: 'Phoenicia Room', capacity: 6, features: ['TV Screen'], availableSlots: ['10:00', '11:00', '13:00', '15:00'] },
//   { id: 3, name: 'Byblos Room', capacity: 12, features: ['Whiteboard', 'Video Call Support'], availableSlots: ['09:00', '12:00', '14:00', '16:00'] }
// ];

// export const MOCK_BOOKINGS: Booking[] = [
//   { id: 101, roomId: 1, time: '10:00', requester: 'Layal Haddad', purpose: 'Client Call' },
//   { id: 102, roomId: 2, time: '11:00', requester: 'Karim Sleiman', purpose: 'Weekly Standup' }
// ];


import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model';

export const MOCK_ROOMS: Room[] = [
  { id: 1, name: 'Cedar Room', capacity: 10, features: ['Projector', 'Whiteboard'], availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
  { id: 2, name: 'Phoenicia Room', capacity: 6, features: ['TV Screen'], availableSlots: ['10:00', '11:00', '13:00', '15:00'] },
  { id: 3, name: 'Byblos Room', capacity: 12, features: ['Whiteboard', 'Video Call Support'], availableSlots: ['09:00', '12:00', '14:00', '16:00'] }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 101, roomId: 1, time: '10:00', requester: 'Layal Haddad', purpose: 'Client Call' },
  { id: 102, roomId: 2, time: '11:00', requester: 'Karim Sleiman', purpose: 'Weekly Standup' }
];
