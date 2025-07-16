import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from '../../../../models/booking.model';
import { Room as RoomModel } from '../../../../models/room.model';
import { BookingService } from '../../../../services/booking.service';


@Component({
  selector: 'app-expandable-booking-item',
  standalone: true,
  templateUrl: './expandable-booking-item.html',
  styleUrl: './expandable-booking-item.css',
  imports: [CommonModule],
})
export class ExpandableBookingItem {
  @Input() room!: RoomModel;
  @Input() bookings: Booking[] = [];

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  editBooking(booking: Booking) {
    this.router.navigate([`/book/${booking.roomId}/edit/${booking.id}`]);
  }

  cancelBooking(booking: Booking) {
    if (confirm(`Cancel booking for ${booking.time}?`)) {
      this.bookingService.deleteBooking(booking.id);
      window.location.reload();
    }
  }
}
