import { Routes } from '@angular/router';
import { Rooms } from './pages/rooms/rooms/rooms';
import { BookingPage } from './pages/booking/booking/booking';
import { Summary } from './pages/summary/summary/summary';

export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  { path: 'rooms', component: Rooms },
  { path: 'book/:roomId', component: BookingPage },
  { path: 'book/:roomId/edit/:bookingId', component: BookingPage },
  { path: 'summary', component: Summary },
];
