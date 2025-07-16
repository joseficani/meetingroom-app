import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { Booking } from '../../../models/booking.model';
import { Room as RoomModel } from '../../../models/room.model';
import { BookingService } from '../../../services/booking.service';
import { RoomService } from '../../../services/room.service';
import { ExpandableBookingItem } from '../expandable-booking-item/expandable-booking-item/expandable-booking-item';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.html',
  styleUrl: './summary.css',
  imports: [
    CommonModule,
    MatTableModule,
    ExpandableBookingItem
  ],
})
export class Summary implements OnInit {
  rooms: RoomModel[] = [];
  bookings: Booking[] = [];
  displayedColumns: string[] = ['name', 'capacity', 'bookings', 'status'];

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

  isFullyBooked(room: RoomModel): boolean {
    return room.availableSlots.every(slot =>
      this.bookings.some(b => b.roomId === room.id && b.time === slot)
    );
  }
}
