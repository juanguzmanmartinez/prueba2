import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpCapacitiesLocalDefaultCapacityDialogComponent } from './op-capacities-local-default-capacity-dialog.component';
import { CapacitiesLocalServiceDefaultCapacity, CapacitiesServiceType, CapacitiesStore } from '../../models/operations-capacities-responses.model';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class OpCapacitiesLocalDefaultCapacityDialogService {

    constructor(private dialog: DialogService) {
    }

    openServiceDefaultCapacityDialog(
        capacitiesLocal: CapacitiesStore,
        localService: CapacitiesLocalServiceDefaultCapacity,
        serviceType: CapacitiesServiceType
    ): MatDialogRef<OpCapacitiesLocalDefaultCapacityDialogComponent> {
        const dialogRef = this.dialog.open(OpCapacitiesLocalDefaultCapacityDialogComponent);

        dialogRef.componentInstance.capacitiesLocal = capacitiesLocal;
        dialogRef.componentInstance.localServiceTypeTable = localService;
        dialogRef.componentInstance.dataSource = serviceType.segmentList;

        return dialogRef;
    }
}
