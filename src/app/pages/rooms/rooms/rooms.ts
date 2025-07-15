import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { BookingService } from '../../../services/booking.service';
import { Room as RoomModel } from '../../../models/room.model';
import { Booking } from '../../../models/booking.model';
import { CommonModule } from '@angular/common';
import { Room } from '../room/room/room';

@Component({
  selector: 'app-rooms',
  standalone: true,
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
  imports: [
    CommonModule,
    Room, 
  ],
})
export class Rooms implements OnInit {
  rooms: RoomModel[] = [];
  bookings: Booking[] = [];

  constructor(private roomService: RoomService, private bookingService: BookingService) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
    this.bookings = this.bookingService.getBookings();
  }

  isSlotBooked(roomId: number, time: string): boolean {
    return this.bookings.some(b => b.roomId === roomId && b.time === time);
  }

  isFullyBooked(room: RoomModel): boolean {
    return room.availableSlots.every((slot: string) => this.isSlotBooked(room.id, slot));
  }
}
