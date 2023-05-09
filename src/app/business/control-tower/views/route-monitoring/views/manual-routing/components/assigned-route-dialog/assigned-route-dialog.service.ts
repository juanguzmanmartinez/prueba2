import { Injectable } from '@angular/core';
import { AssignedRouteDialogComponent } from './assigned-route-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@molecules/dialog/dialog.service';

@Injectable()
export class AssignedRouteDialogService {
  dialogRef: MatDialogRef<AssignedRouteDialogComponent>;
  constructor(private dialog: DialogService) { }
  open() {
    this.dialogRef = this.dialog.open(AssignedRouteDialogComponent);
    return this.dialogRef;
  }
  close(data?){
    this.dialogRef.close(data);
  }

  // constructor(private matDialog: MatDialog) {}

  // get dialog() {
  //   return this.matDialog;
  // }

  // openDialog(): MatDialogRef<any> {
  //   this.dialogRef = this.matDialog.open(AssignedRouteDialogComponent, {
  //     width: '400px',
  //     disableClose: false,
  //   });

  //   return this.dialogRef;
  // }

  // close(dialogResult?: boolean) {
  //   this.dialogRef.close(dialogResult);
  // }

  // closeAll() {
  //   this.matDialog.closeAll();
  // }
}
