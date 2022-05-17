import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpCapacitiesDrugstoreDefaultCapacityDialogComponent } from './op-capacities-drugstore-default-capacity-dialog.component';
import {
  CapacitiesDrugstore,
  CapacitiesDrugstoreServiceDefaultCapacity,
  CapacitiesServiceType
} from '../../models/operations-capacities-responses.model';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class OpCapacitiesDrugstoreDefaultCapacityDialogService {

  constructor(
    private dialog: DialogService
  ) { }

  openServiceDefaultCapacityDialog(
    capacitiesDrugstore: CapacitiesDrugstore,
    drugstoreService: CapacitiesDrugstoreServiceDefaultCapacity,
    serviceType: CapacitiesServiceType
  ): MatDialogRef<OpCapacitiesDrugstoreDefaultCapacityDialogComponent> {
    const dialogRef = this.dialog.open(OpCapacitiesDrugstoreDefaultCapacityDialogComponent);

    dialogRef.componentInstance.capacitiesDrugstore = capacitiesDrugstore;
    dialogRef.componentInstance.drugstoreServiceTypeTable = drugstoreService;
    dialogRef.componentInstance.dataSource = serviceType.segmentList;

    return dialogRef;
  }
}
