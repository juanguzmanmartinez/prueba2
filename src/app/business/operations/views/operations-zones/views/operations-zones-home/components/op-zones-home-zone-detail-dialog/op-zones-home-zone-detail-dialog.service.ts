import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OpZonesHomeZoneDetailDialogComponent } from './op-zones-home-zone-detail-dialog.component';
import { Zone } from '../../../../models/operations-zones.model';

@Injectable()
export class OpZonesHomeZoneDetailDialogService {

    constructor(
        private _dialog: DialogService,
    ) {
    }

    open(zone: Zone): MatDialogRef<OpZonesHomeZoneDetailDialogComponent> {
        const dialogRef = this._dialog.open(OpZonesHomeZoneDetailDialogComponent);
        dialogRef.componentInstance.zone = zone;
        return dialogRef;
    }
}
