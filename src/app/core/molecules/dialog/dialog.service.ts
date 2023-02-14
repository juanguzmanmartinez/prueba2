import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';


@Injectable()
export class DialogService {
  private readonly config: MatDialogConfig = {
    width: '526px',
    maxHeight: '100vh',
    closeOnNavigation: true,
  };

  constructor(private matDialog: MatDialog) {}

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
