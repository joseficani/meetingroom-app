import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Booking } from '../../../../models/booking.model';
import { Room } from '../../../../models/room.model';

@Component({
  standalone: true,
  selector: 'app-room',
  templateUrl: './room.html',
  styleUrl: './room.css',
  imports: [CommonModule],
})
export class RoomComponent {
  @Input() room!: Room;
  @Input() bookings: Booking[] = [];
  @Input() isFullyBooked: boolean = false;

  @Output() slotSelected = new EventEmitter<string>();

  isSlotBooked(time: string): boolean {
    return this.bookings.some(b => b.roomId === this.room.id && b.time === time);
  }

  onSlotClick(time: string) {
    this.slotSelected.emit(time);
  }
}
