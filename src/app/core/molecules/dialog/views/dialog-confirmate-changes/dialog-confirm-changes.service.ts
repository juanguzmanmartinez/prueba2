import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmChangesComponent } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.component';

@Injectable()
export class DialogConfirmChangesService {
    constructor(private _dialogService: DialogService) {
    }

    open(): MatDialogRef<DialogConfirmChangesComponent> {
        return this._dialogService.open(DialogConfirmChangesComponent, {
            width: '444px',
            minHeight: '216px',
            disableClose: true,
        });
    }
}
