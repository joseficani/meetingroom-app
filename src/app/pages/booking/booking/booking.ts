// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RoomService } from '../../../services/room.service';
// import { BookingService } from '../../../services/booking.service';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Room as RoomModel } from '../../../models/room.model';
// import { Booking } from '../../../models/booking.model';
// import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';

// @Component({
//   standalone: true,
//   selector: 'app-booking',
//   templateUrl: './booking.html',
//   styleUrl: './booking.css',
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//   ],
// })
// export class BookingPage implements OnInit {
//   form!: FormGroup;
//   room!: RoomModel;
//   booking?: Booking;
//   availableSlots: string[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder,
//     private roomService: RoomService,
//     private bookingService: BookingService
//   ) {}

//   // ngOnInit() {
//   //   const roomId = +this.route.snapshot.paramMap.get('roomId')!;
//   //   const bookingId = this.route.snapshot.paramMap.get('bookingId');

//   //   this.room = this.roomService.getRoomById(roomId)!;

//   //   this.availableSlots = this.room.availableSlots.filter(slot => {
//   //     return !this.bookingService.getBookingsByRoom(roomId).some(b => b.time === slot);
//   //   });

//   //   if (bookingId) {
//   //     this.booking = this.bookingService.getBookingById(+bookingId);
//   //     if (this.booking) {
//   //       this.availableSlots.push(this.booking.time);
//   //     }
//   //   }

//   //   this.form = this.fb.group({
//   //     requester: [this.booking?.requester || '', Validators.required],
//   //     purpose: [this.booking?.purpose || '', Validators.required],
//   //     slot: [this.booking?.time || '', Validators.required],
//   //   });
//   // }

//   // onSubmit() {
//   //   if (confirm(`You are booking ${this.room.name} at ${this.form.value.slot} — confirm?`)) {
//   //     const data: Booking = {
//   //       id: this.booking?.id ?? Date.now(),
//   //       roomId: this.room.id,
//   //       requester: this.form.value.requester,
//   //       purpose: this.form.value.purpose,
//   //       time: this.form.value.slot,
//   //     };

//   //     if (this.booking) {
//   //       this.bookingService.updateBooking(data);
//   //     } else {
//   //       this.bookingService.addBooking(data);
//   //     }

//   //     this.router.navigate(['/summary']);
//   //   }

//   ngOnInit() {
//   const roomId = +this.route.snapshot.paramMap.get('roomId')!;
//   const bookingId = this.route.snapshot.paramMap.get('bookingId');

//   this.room = this.roomService.getRoomById(roomId)!;

//   // Fetch all bookings for this room
//   const roomBookings = this.bookingService.getBookingsByRoom(roomId);

//   if (bookingId) {
//     this.booking = this.bookingService.getBookingById(+bookingId);
//   }

//   // Exclude booked slots except for current slot if editing
//   this.availableSlots = this.room.availableSlots.filter(slot => {
//     const isBooked = roomBookings.some(b => b.time === slot);
//     if (this.booking && this.booking.time === slot) {
//       return true; // keep current slot
//     }
//     return !isBooked;
//   });

//   this.form = this.fb.group({
//     requester: [this.booking?.requester || '', Validators.required],
//     purpose: [this.booking?.purpose || '', Validators.required],
//     slot: [this.booking?.time || '', Validators.required],
//   });
// }

// onSubmit() {
//   const data: Booking = {
//     id: this.booking?.id ?? Date.now(),
//     roomId: this.room.id,
//     requester: this.form.value.requester,
//     purpose: this.form.value.purpose,
//     time: this.form.value.slot,
//   };

//   if (this.booking) {
//     this.bookingService.updateBooking(data);
//   } else {
//     this.bookingService.addBooking(data);
//   }

//   this.router.navigate(['/summary']);
// }

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { BookingService } from '../../../services/booking.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Room as RoomModel } from '../../../models/room.model';
import { Booking } from '../../../models/booking.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  room!: RoomModel;
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

    const roomBookings = this.bookingService.getBookingsByRoom(roomId);

    if (bookingId) {
      this.booking = this.bookingService.getBookingById(+bookingId);
    }

    this.availableSlots = this.room.availableSlots.filter(slot => {
      const isBooked = roomBookings.some(b => b.time === slot);
      if (this.booking && this.booking.time === slot) {
        return true; // allow current slot
      }
      return !isBooked;
    });

    this.form = this.fb.group({
      requester: [this.booking?.requester || '', Validators.required],
      purpose: [this.booking?.purpose || '', Validators.required],
      slot: [this.booking?.time || '', Validators.required],
    });
  }
onCancel() {
  this.router.navigate(['/summary']);
}

  onSubmit() {
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
}
