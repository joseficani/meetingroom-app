// import { Injectable } from '@angular/core';
// import { Booking } from '../models/booking.model';
// import { MOCK_BOOKINGS } from './mock-data';

// @Injectable({ providedIn: 'root' })
// export class BookingService {
//   private bookings = MOCK_BOOKINGS;

//   getBookings(): Booking[] {
//     return this.bookings;
//   }

//   getBookingsByRoom(roomId: number): Booking[] {
//     return this.bookings.filter(b => b.roomId === roomId);
//   }

//   getBookingById(id: number): Booking | undefined {
//     return this.bookings.find(b => b.id === id);
//   }

//   addBooking(booking: Booking) {
//     booking.id = Date.now();
//     this.bookings.push(booking);
//   }

//   updateBooking(updated: Booking) {
//     const idx = this.bookings.findIndex(b => b.id === updated.id);
//     if (idx !== -1) this.bookings[idx] = updated;
//   }

//   deleteBooking(id: number) {
//     this.bookings = this.bookings.filter(b => b.id !== id);
//   }
// }


import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { MOCK_BOOKINGS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookings = MOCK_BOOKINGS;

  getBookings() {
    return this.bookings;
  }

  getBookingsByRoom(roomId: number) {
    return this.bookings.filter(b => b.roomId === roomId);
  }

  getBookingById(id: number) {
    return this.bookings.find(b => b.id === id);
  }

  addBooking(booking: Booking) {
    booking.id = Date.now();
    this.bookings.push(booking);
  }

  updateBooking(updated: Booking) {
    const index = this.bookings.findIndex(b => b.id === updated.id);
    if (index > -1) this.bookings[index] = updated;
  }

  deleteBooking(id: number) {
    this.bookings = this.bookings.filter(b => b.id !== id);
  }
}
