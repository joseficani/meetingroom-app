import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from '../../../models/booking.model';
import { Room } from '../../../models/room.model';
import { BookingService } from '../../../services/booking.service';
import { RoomService } from '../../../services/room.service';
import { RoomComponent } from '../room/room/room';

@Component({
  selector: 'app-rooms',
  standalone: true,
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
  imports: [
    CommonModule,
    RoomComponent,
  ],
})
export class Rooms implements OnInit {
  rooms: Room[] = [];
  bookings: Booking[] = [];

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
    this.bookings = this.bookingService.getBookings();
  }

  isSlotBooked(roomId: number, time: string): boolean {
    return this.bookings.some(b => b.roomId === roomId && b.time === time);
  }

  isFullyBooked(room: Room): boolean {
    return room.availableSlots.every(slot => this.isSlotBooked(room.id, slot));
  }

  handleSlotSelected(roomId: number, slot: string) {
    this.router.navigate([`/book/${roomId}`], { queryParams: { slot } });
  }
}
