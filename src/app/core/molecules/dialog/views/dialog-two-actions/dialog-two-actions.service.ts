import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogTwoActionsComponent } from './dialog-two-actions.component';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

@Injectable()
export class DialogTwoActionsService {

    private dialogRef: MatDialogRef<DialogTwoActionsComponent>;

    constructor(private _dialogService: DialogService) {
    }

    open(
        data: {
            title: string,
            description: string,
            primaryAction: string,
            secondaryAction: string,
            fontName?: string,
            fontClass?: string,
            svgName?: string
        },
        config: MatDialogConfig = {}
    ): MatDialogRef<DialogTwoActionsComponent, boolean> {
        this.dialogRef = this._dialogService.open(DialogTwoActionsComponent, {
            width: '444px',
            minHeight: '240px',
            ...config
        });

        this.dialogRef.componentInstance.title = data.title;
        this.dialogRef.componentInstance.description = data.description;
        this.dialogRef.componentInstance.primaryAction = data.primaryAction;
        this.dialogRef.componentInstance.secondaryAction = data.secondaryAction;
        this.dialogRef.componentInstance.fontName = data.fontName;
        this.dialogRef.componentInstance.fontClass = data.fontClass;
        this.dialogRef.componentInstance.svgName = data.svgName;
        return this.dialogRef;
    }

    close(dialogResult?: boolean) {
        this.dialogRef.close(dialogResult);
    }

    closeAll() {
        this._dialogService.closeAll();
    }

    openConfirmChanges() {
        return this.open({
                title: 'Confirmación de cambios',
                description: '¿Deseas guardar los cambios realizados?',
                primaryAction: 'Guardar cambios',
                secondaryAction: 'Cancelar',
                fontName: 'info',
                fontClass: 'text-primary'
            },
            {disableClose: true});
    }


    openInfo(
        data: {
            title: string,
            description: string,
            primaryAction: string,
            secondaryAction: string
        },
        config: MatDialogConfig = {}
    ): MatDialogRef<DialogTwoActionsComponent, boolean> {
        return this.open({
            ...data,
            fontName: 'info',
            fontClass: 'text-primary'
        }, config);
    }
}
