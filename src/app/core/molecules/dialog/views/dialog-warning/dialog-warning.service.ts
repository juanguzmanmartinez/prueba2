import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogWarningComponent } from './dialog-warning.component';

@Injectable()
export class DialogWarningService {
    constructor(private _dialogService: DialogService) {
    }

    open(
        title: string,
        description: string,
        action: string,
    ): MatDialogRef<DialogWarningComponent> {
        const dialogRef = this._dialogService.open(DialogWarningComponent, {
            width: '444px',
            minHeight: '240px',
        });

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description;
        dialogRef.componentInstance.action = action;
        return dialogRef;
    }
}
