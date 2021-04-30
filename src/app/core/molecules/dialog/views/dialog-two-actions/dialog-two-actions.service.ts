import { Injectable } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogTwoActionsComponent } from './dialog-two-actions.component';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

@Injectable()
export class DialogTwoActionsService {
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
    ): MatDialogRef<DialogTwoActionsComponent> {
        const dialogRef = this._dialogService.open(DialogTwoActionsComponent, {
            width: '444px',
            minHeight: '240px',
            ...config
        });

        dialogRef.componentInstance.title = data.title;
        dialogRef.componentInstance.description = data.description;
        dialogRef.componentInstance.primaryAction = data.primaryAction;
        dialogRef.componentInstance.secondaryAction = data.secondaryAction;
        dialogRef.componentInstance.fontName = data.fontName;
        dialogRef.componentInstance.fontClass = data.fontClass;
        dialogRef.componentInstance.svgName = data.svgName;
        return dialogRef;
    }

    closeAll(){
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
    ): MatDialogRef<DialogTwoActionsComponent> {
        return this.open({
            ...data,
            fontName: 'info',
            fontClass: 'text-primary'
        }, config);
    }
}
