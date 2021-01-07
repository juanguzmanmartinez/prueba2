import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OpCapacitiesLocalDefaultCapacityDialogComponent } from './op-capacities-local-default-capacity-dialog.component';
import { CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity, CapacitiesServiceType } from '../../models/operations-capacities-responses.model';

@Injectable()
export class OpCapacitiesLocalDefaultCapacityDialogService {

    constructor(private dialog: MatDialog) {
    }

    openServiceDefaultCapacityDialog(
        capacitiesLocal: CapacitiesLocal,
        localService: CapacitiesLocalServiceDefaultCapacity,
        serviceType: CapacitiesServiceType
    ): MatDialogRef<OpCapacitiesLocalDefaultCapacityDialogComponent> {
        const dialogRef = this.dialog.open(OpCapacitiesLocalDefaultCapacityDialogComponent, {
            width: '526px',
            minHeight: '399px'
        });

        dialogRef.componentInstance.capacitiesLocal = capacitiesLocal;
        dialogRef.componentInstance.localServiceTypeTable = localService;
        dialogRef.componentInstance.defaultCapacityTableDataSource = serviceType.segmentList;

        return dialogRef;
    }
}
