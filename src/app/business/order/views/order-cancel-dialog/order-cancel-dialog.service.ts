import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@molecules/dialog/dialog.service';
import { OrderCancelDialogComponent } from './order-cancel-dialog.component';

@Injectable()
export class OrderCancelDialogService {
  dialogRef: MatDialogRef<OrderCancelDialogComponent>
  constructor(private dialog: DialogService) { }
  open(orderId: string) {
    this.dialogRef = this.dialog.open(OrderCancelDialogComponent);
    this.dialogRef.componentInstance.orderId = orderId;
    return this.dialogRef;
  }
  close(data?){
    this.dialogRef.close(data);
  }
}
