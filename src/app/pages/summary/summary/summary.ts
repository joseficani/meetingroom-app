
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Booking } from '../../../models/booking.model';
import { Room } from '../../../models/room.model';
import { BookingService } from '../../../services/booking.service';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.html',
  styleUrl: './summary.css',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
})
export class Summary implements OnInit {
  rooms: Room[] = [];
  bookings: Booking[] = [];
  expandedRoomId: number | null = null;

  displayedColumns: string[] = ['name', 'capacity', 'bookings', 'status', 'expand'];

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
    this.bookings = this.bookingService.getBookings();
  }

  getRoomBookings(roomId: number): Booking[] {
    return this.bookings.filter(b => b.roomId === roomId);
  }

  isFullyBooked(room: Room): boolean {
    return room.availableSlots.every(slot =>
      this.bookings.some(b => b.roomId === room.id && b.time === slot)
    );
  }

  hasAnyBooking(): boolean {
    return this.bookings.length > 0;
  }

  toggleExpand(roomId: number) {
    this.expandedRoomId = this.expandedRoomId === roomId ? null : roomId;
  }

  confirmCancelBooking(bookingId: number) {
    if (confirm("Are you sure you want to cancel this booking?")) {
      this.bookingService.deleteBooking(bookingId);
      this.bookings = this.bookingService.getBookings();
    }
  }
}
