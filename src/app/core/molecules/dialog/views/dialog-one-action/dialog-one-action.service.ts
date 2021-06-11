import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogOneActionComponent } from './dialog-one-action.component';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

@Injectable()
export class DialogOneActionService {
    constructor(private _dialogService: DialogService) {
    }

    open(
        data: {
            title: string,
            description: string,
            action: string,
            fontName?: string,
            fontClass?: string,
            svgName?: string
        },
        config: MatDialogConfig = {}
    ): MatDialogRef<DialogOneActionComponent> {
        const dialogRef = this._dialogService.open(DialogOneActionComponent, {
            width: '444px',
            minHeight: '240px',
            ...config
        });

        dialogRef.componentInstance.title = data.title;
        dialogRef.componentInstance.description = data.description;
        dialogRef.componentInstance.action = data.action;
        dialogRef.componentInstance.fontName = data.fontName;
        dialogRef.componentInstance.fontClass = data.fontClass;
        dialogRef.componentInstance.svgName = data.svgName;
        return dialogRef;
    }

    closeAll(){
        this._dialogService.closeAll();
    }

    openWarning(
        data: {
            title: string,
            description: string,
            action: string
        },
        config: MatDialogConfig = {}
    ): MatDialogRef<DialogOneActionComponent> {
        return this.open({
            ...data, fontName: 'warning', fontClass: 'text-warning'
        }, config);
    }
}
