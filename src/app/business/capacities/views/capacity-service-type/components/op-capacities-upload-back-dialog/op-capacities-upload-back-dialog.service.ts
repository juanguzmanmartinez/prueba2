import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import {
//   CapacitiesDrugstore,
//   CapacitiesDrugstoreServiceDefaultCapacity,
//   CapacitiesServiceType
// } from '../../models/operations-capacities-responses.model';
import { DialogService } from '@molecules/dialog/dialog.service';
import { OpCapacitiesUploadBackDialogComponent } from './op-capacities-upload-back-dialog.component';
@Injectable()
export class OpCapacitiesUploadBackDialogService {
  constructor(private dialog: DialogService) {}

  open(local: any): MatDialogRef<OpCapacitiesUploadBackDialogComponent> {
    const dialogRef = this.dialog.open(OpCapacitiesUploadBackDialogComponent);
    dialogRef.componentInstance.local = local;
    return dialogRef;
  }
}
