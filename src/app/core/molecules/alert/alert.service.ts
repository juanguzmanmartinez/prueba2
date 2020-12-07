import {Injectable} from '@angular/core';
import {AlertComponent, EAlertStatus} from './alert.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable()
export class AlertService {

  constructor(private _matSnackBar: MatSnackBar) {
  }

  public get matSnackbar() {
    return this._matSnackBar;
  }

  public alert(message: string, status: EAlertStatus, config: MatSnackBarConfig = {}) {
    config.duration = 5000;
    config.verticalPosition = 'bottom';
    config.panelClass = 'alert';
    config.data = {message, status};
    return this.matSnackbar.openFromComponent(AlertComponent, config);
  }

  public alertSuccess(message: string, config: MatSnackBarConfig = {}) {
    return this.alert(message, EAlertStatus.success, config);
  }

  public alertWarning(message: string, config: MatSnackBarConfig = {}) {
    return this.alert(message, EAlertStatus.warning, config);
  }

  public alertError(message: string, config: MatSnackBarConfig = {}) {
    return this.alert(message, EAlertStatus.error, config);
  }

}
