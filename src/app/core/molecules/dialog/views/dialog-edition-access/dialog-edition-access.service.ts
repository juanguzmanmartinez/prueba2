import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogEditionAccessComponent } from './dialog-edition-access.component';

@Injectable()
export class DialogEditionAccessService {
    constructor(private _dialogService: DialogService) {
    }

    open(): MatDialogRef<DialogEditionAccessComponent> {
        return this._dialogService.open(DialogEditionAccessComponent, {
            width: '444px',
            minHeight: '240px',
        });
    }
}
