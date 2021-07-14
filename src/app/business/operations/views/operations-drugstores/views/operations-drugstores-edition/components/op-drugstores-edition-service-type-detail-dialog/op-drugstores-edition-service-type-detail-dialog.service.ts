import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { OpDrugstoresEditionServiceTypeDetailDialogComponent } from './op-drugstores-edition-service-type-detail-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class OpDrugstoresEditionServiceTypeDetailDialogService {
    constructor(
        private _dialog: DialogService,
    ) {
    }

    open(splitSegmentList: string[]): MatDialogRef<OpDrugstoresEditionServiceTypeDetailDialogComponent> {
        const dialogRef = this._dialog.open(OpDrugstoresEditionServiceTypeDetailDialogComponent);
        dialogRef.componentInstance.splitSegmentList = splitSegmentList;

        return dialogRef;
    }
}
