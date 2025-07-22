import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

import { Booking } from '../../../models/booking.model';
import { Room } from '../../../models/room.model';
import { BookingService } from '../../../services/booking.service';
import { RoomService } from '../../../services/room.service';
import { ConfirmDialog } from '../confirm-dialog';
import { ExpandableBookingItem } from '../expandable-booking-item/expandable-booking-item/expandable-booking-item';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.html',
  styleUrls: ['./summary.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ExpandableBookingItem
  ],
})
export class Summary implements OnInit {
  rooms: Room[] = [];
  bookings: Booking[] = [];
  expandedRoomId: number | null = null;

  displayedColumns: string[] = ['name', 'capacity', 'bookings', 'status', 'expand'];

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
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

  toggleExpand(roomId: number): void {
    this.expandedRoomId = this.expandedRoomId === roomId ? null : roomId;
  }

  isExpanded(room: Room): boolean {
    return this.expandedRoomId === room.id;
  }

  confirmCancelBooking(bookingId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.deleteBooking(bookingId);
        this.bookings = this.bookingService.getBookings();
      }
    });
  }
}
