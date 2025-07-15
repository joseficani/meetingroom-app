import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { BookingService } from '../../../services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../../models/room.model';
import { Booking } from '../../../models/booking.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-booking',
  templateUrl: './booking.html',
  styleUrl: './booking.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  ngOnInit() {
    const roomId = +this.route.snapshot.paramMap.get('roomId')!;
    const bookingId = this.route.snapshot.paramMap.get('bookingId');

    this.room = this.roomService.getRoomById(roomId)!;

    this.availableSlots = this.room.availableSlots.filter(slot => {
      return !this.bookingService.getBookingsByRoom(roomId).some(b => b.time === slot);
    });

    if (bookingId) {
      this.booking = this.bookingService.getBookingById(+bookingId);
      if (this.booking) {
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

  onSubmit() {
    if (this.form.invalid) return;

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

  onCancel() {
    this.router.navigate(['/rooms']);
  }
}
