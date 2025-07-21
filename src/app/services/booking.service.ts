

// import { Injectable } from '@angular/core';
// import { Booking } from '../models/booking.model';
// import { MOCK_BOOKINGS } from './mock-data';

// @Injectable({ providedIn: 'root' })
// export class BookingService {
//   private bookings = MOCK_BOOKINGS;

//   getBookings() {
//     return this.bookings;
//   }

//   getBookingsByRoom(roomId: number) {
//     return this.bookings.filter(b => b.roomId === roomId);
//   }

//   getBookingById(id: number) {
//     return this.bookings.find(b => b.id === id);
//   }

//   addBooking(booking: Booking) {
//     booking.id = Date.now();
//     this.bookings.push(booking);
//   }

//   updateBooking(updated: Booking) {
//     const index = this.bookings.findIndex(b => b.id === updated.id);
//     if (index > -1) this.bookings[index] = updated;
//   }

//   deleteBooking(id: number) {
//     this.bookings = this.bookings.filter(b => b.id !== id);
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking.model';
import { MOCK_BOOKINGS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>(MOCK_BOOKINGS);
  bookings$ = this.bookingsSubject.asObservable();

  getBookings(): Booking[] {
    return this.bookingsSubject.getValue();
  }

  getBookingsByRoom(roomId: number): Booking[] {
    return this.getBookings().filter(b => b.roomId === roomId);
  }

  getBookingById(id: number): Booking | undefined {
    return this.getBookings().find(b => b.id === id);
  }

  addBooking(booking: Booking) {
    booking.id = Date.now();
    const updated = [...this.getBookings(), booking];
    this.bookingsSubject.next(updated);
  }

  updateBooking(updated: Booking) {
    const updatedList = this.getBookings().map(b =>
      b.id === updated.id ? updated : b
    );
    this.bookingsSubject.next(updatedList);
  }

  deleteBooking(id: number) {
    const updatedList = this.getBookings().filter(b => b.id !== id);
    this.bookingsSubject.next(updatedList);
  }
}
