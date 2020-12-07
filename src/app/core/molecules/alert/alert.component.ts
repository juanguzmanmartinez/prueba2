import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

export enum EAlertStatus {
  success = 'success',
  warning = 'warning',
  error = 'error',
}

@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public eAlertStatus = EAlertStatus;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, status: EAlertStatus }
  ) {
  }

  ngOnInit(): void {
  }

}
