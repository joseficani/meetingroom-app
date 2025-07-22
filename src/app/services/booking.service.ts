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
