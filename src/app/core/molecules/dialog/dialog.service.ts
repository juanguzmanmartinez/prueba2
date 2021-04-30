import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

@Injectable()
export class DialogService {

    private readonly config: MatDialogConfig = {
        width: '526px',
        minHeight: '347px',
        closeOnNavigation: true,
    };

    constructor(private matDialog: MatDialog) {
    }

    get dialog() {
        return this.matDialog;
    }

    open(
        template: ComponentType<any> | TemplateRef<any>,
        config: MatDialogConfig = this.config
    ): MatDialogRef<any> {
        return this.matDialog.open(template, config);
    }

    closeAll() {
        this.matDialog.closeAll();
    }
}
