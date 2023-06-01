import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@molecules/dialog/dialog.service';
import { DetailRouteDialogComponent } from './detail-route-dialog.component';

@Injectable()
export class DetailRouteDialogService {
  dialogRef: MatDialogRef<DetailRouteDialogComponent>;
  constructor(private dialog: DialogService) {}
  open() {
    this.dialogRef = this.dialog.open(DetailRouteDialogComponent);
    return this.dialogRef;
  }
  close(data?) {
    this.dialogRef.close(data);
  }
}
