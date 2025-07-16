import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Booking } from '../../../models/booking.model';
import { Room } from '../../../models/room.model';
import { BookingService } from '../../../services/booking.service';
import { RoomService } from '../../../services/room.service';

@Component({
  standalone: true,
  selector: 'app-booking',
  templateUrl: './booking.html',
  styleUrl: './booking.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class BookingPage implements OnInit {
  form!: FormGroup;
  room!: Room;
  booking?: Booking;
  availableSlots: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private roomService: RoomService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const roomIdParam = this.route.snapshot.paramMap.get('roomId');
    const bookingIdParam = this.route.snapshot.paramMap.get('bookingId');

    if (!roomIdParam) {
      console.error('No roomId provided in route');
      this.router.navigate(['/rooms']);
      return;
    }

    const roomId = +roomIdParam;
    this.room = this.roomService.getRoomById(roomId)!;

    if (!this.room) {
      console.error(`Room with ID ${roomId} not found`);
      this.router.navigate(['/rooms']);
      return;
    }

    // Determine available slots, excluding already booked ones
    this.availableSlots = this.room.availableSlots.filter(slot => {
      return !this.bookingService.getBookingsByRoom(roomId).some(b => b.time === slot);
    });

    if (bookingIdParam) {
      const bookingId = +bookingIdParam;
      this.booking = this.bookingService.getBookingById(bookingId);

      if (this.booking) {
        // If editing, include the current booked slot in the list (even if otherwise booked)
        if (!this.availableSlots.includes(this.booking.time)) {
          this.availableSlots.push(this.booking.time);
        }
      }
    }

    this.form = this.fb.group({
      requester: [this.booking?.requester || '', Validators.required],
      purpose: [this.booking?.purpose || '', Validators.required],
      slot: [this.booking?.time || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Booking = {
      id: this.booking?.id ?? Date.now(),
      roomId: this.room.id,
      requester: this.form.value.requester,
      purpose: this.form.value.purpose,
      time: this.form.value.slot,
    };

    if (this.booking) {
      this.bookingService.updateBooking(data);
    } else {
      this.bookingService.addBooking(data);
    }

    this.router.navigate(['/summary']);
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }
}
