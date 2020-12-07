import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class LoginFormService implements OnDestroy {
  private readonly loginForm: FormGroup;

  private _userControl: FormControl = new FormControl(null);
  private _passwordControl: FormControl = new FormControl(null);

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.loginForm = this._formBuilder.group({
      user: this._userControl,
      password: this._passwordControl,
    });
  }

  get loginForm$() {
    return this.loginForm;
  }

  get userControl(): FormControl {
    return this.loginForm$.get('user') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm$.get('password') as FormControl;
  }

  resetForm() {
    this.userControl.patchValue(null);
    this.passwordControl.patchValue(null);
  }

  ngOnDestroy() {
    this.resetForm();
  }
}
