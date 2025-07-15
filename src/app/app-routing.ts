import { Routes } from '@angular/router';
import { Rooms } from './pages/rooms/rooms';
import { Booking } from './pages/booking/booking';
import { Summary } from './pages/summary/summary';

export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  { path: 'rooms', component: Rooms },
  { path: 'book/:roomId', component: Booking },
  { path: 'book/:roomId/edit/:bookingId', component: Booking },
  { path: 'summary', component: Summary }
];
