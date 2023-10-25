import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { OpZonesEditionServiceTypeDetailDialogComponent } from './op-zones-edition-service-type-detail-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class OpZonesEditionServiceTypeDetailDialogService {

  constructor(
    private dialog: DialogService,
  ) { }

  open(splitSegmentList: string[]): MatDialogRef<OpZonesEditionServiceTypeDetailDialogComponent> {
    const dialogRef = this.dialog.open(OpZonesEditionServiceTypeDetailDialogComponent);
    dialogRef.componentInstance.splitSegmentList = splitSegmentList;
    return dialogRef;
  }
}
