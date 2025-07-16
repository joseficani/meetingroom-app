// import { CommonModule } from '@angular/common';
// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-confirm-dialog',
//   standalone: true,
//   template: `
//     <h2 mat-dialog-title>Confirm Cancellation</h2>
//     <mat-dialog-content>
//       Are you sure you want to cancel this booking?
//     </mat-dialog-content>
//     <mat-dialog-actions align="end">
//       <button mat-button (click)="onNo()">No</button>
//       <button mat-raised-button color="warn" (click)="onYes()">Yes</button>
//     </mat-dialog-actions>
//   `,
//   imports: [CommonModule, MatDialogModule],
// })
// export class ConfirmDialog {
//   constructor(
//     private dialogRef: MatDialogRef<ConfirmDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   onNo() {
//     this.dialogRef.close(false);
//   }

//   onYes() {
//     this.dialogRef.close(true);
//   }
// }


import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>
      Are you sure you want to cancel this booking?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose(false)">No</button>
      <button mat-button color="warn" (click)="onClose(true)">Yes</button>
    </mat-dialog-actions>
  `,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmDialog {
  constructor(private dialogRef: MatDialogRef<ConfirmDialog>) {}

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }
}
