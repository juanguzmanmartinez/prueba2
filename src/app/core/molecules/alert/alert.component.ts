import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export enum EAlertStatus {
  success = 'success',
  warning = 'warning',
  error = 'error',
  lightSuccess = 'lightSuccess',
  lightError = 'lightError',
}

@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  public eAlertStatus = EAlertStatus;

  get fontNameIcon(): string {
    if (this.data?.status === EAlertStatus.error) return 'cancel';
    if (this.data?.status === EAlertStatus.warning) return 'warning';
    if (this.data?.status === EAlertStatus.success) return 'check_circle';
    return '';
  }

  get classAlertText(): string {
    if (this.data?.status === EAlertStatus.error) return 'text-dark-danger';
    if (this.data?.status === EAlertStatus.warning) return 'text-dark-warning';
    if (this.data?.status === EAlertStatus.success) return 'text-dark-success';
    if (
      this.data?.status === EAlertStatus.lightSuccess ||
      this.data?.status === EAlertStatus.lightError
    )
      return 'text-body-1-regular text-black';
    return '';
  }

  get innerClassIcon(): string {
    if (this.data?.status === EAlertStatus.error) return 'text-dark-danger';
    if (this.data?.status === EAlertStatus.warning) return 'text-dark-warning';
    if (this.data?.status === EAlertStatus.success) return 'text-dark-success';
    else 'd-block';
  }

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; status: EAlertStatus }
  ) {}

  ngOnInit(): void {}

  get svgLightIcon(): string {
    if (this.data?.status === this.eAlertStatus.lightSuccess) return 'check';
    if (this.data?.status === this.eAlertStatus.lightError)
      return 'alert-error';
    return '';
  }
}
