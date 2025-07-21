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
