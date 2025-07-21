import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from '../../../../models/booking.model';
import { Room as RoomModel } from '../../../../models/room.model';

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
  @Output() cancel = new EventEmitter<number>();

  constructor(
    private router: Router
  ) {}

  editBooking(booking: Booking) {
    this.router.navigate([`/book/${booking.roomId}/edit/${booking.id}`]);
  }

  cancelBooking(booking: Booking) {
    this.cancel.emit(booking.id);
  }
}
