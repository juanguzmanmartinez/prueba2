import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SameLocalDialogComponent } from './same-local-dialog.component';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class SameLocalDialogService {
  dialogRef: MatDialogRef<SameLocalDialogComponent>;
  constructor(private dialog: DialogService) {}

  open() {
    this.dialogRef = this.dialog.open(SameLocalDialogComponent);
    return this.dialogRef;
  }

  close(data?) {
    this.dialogRef.close(data);
  }
}
