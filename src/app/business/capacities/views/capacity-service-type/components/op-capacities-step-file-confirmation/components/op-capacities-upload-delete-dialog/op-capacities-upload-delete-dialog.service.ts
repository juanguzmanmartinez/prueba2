import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import {
//   CapacitiesDrugstore,
//   CapacitiesDrugstoreServiceDefaultCapacity,
//   CapacitiesServiceType
// } from '../../models/operations-capacities-responses.model';
import { DialogService } from '@molecules/dialog/dialog.service';
import { OpCapacitiesUploadDeleteDialogComponent } from './op-capacities-upload-delete-dialog.component';

@Injectable()
export class OpCapacitiesUploadDeleteDialogService {
  constructor(private dialog: DialogService) {}

  open(local: any): MatDialogRef<OpCapacitiesUploadDeleteDialogComponent> {
    const dialogRef = this.dialog.open(OpCapacitiesUploadDeleteDialogComponent);
    dialogRef.componentInstance.local = local;
    return dialogRef;
  }
}
