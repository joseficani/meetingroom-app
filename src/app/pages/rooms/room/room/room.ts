import { Component, Input } from '@angular/core';
import { Room as RoomModel } from '../../../../models/room.model';
import { Booking } from '../../../../models/booking.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-room',
  templateUrl: './room.html',
  styleUrl: './room.css',
  imports: [CommonModule],
})
export class Room {
  @Input() room!: RoomModel;
  @Input() bookings: Booking[] = [];
  @Input() isFullyBooked: boolean = false;

  constructor(private router: Router) {}

  isSlotBooked(time: string): boolean {
    return this.bookings.some(b => b.roomId === this.room.id && b.time === time);
  }

  bookSlot(time: string) {
    this.router.navigate([`/book/${this.room.id}`], { queryParams: { slot: time } });
  }
}
