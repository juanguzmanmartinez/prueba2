import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { DialogLoaderComponent } from '@molecules/dialog/views/dialog-loader/dialog-loader.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class DialogLoaderService {
    constructor(private _dialogService: DialogService) {
    }

    open(): MatDialogRef<DialogLoaderComponent> {
        return this._dialogService.open(DialogLoaderComponent, {
            width: '300px',
            height: '150px',
            disableClose: true,
        });
    }
}
