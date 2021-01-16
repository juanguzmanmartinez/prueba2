import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmailControl } from '../controls/email.control';

@Injectable()
export class RecoverPasswordUserForm implements OnDestroy {
    private readonly form: FormGroup;

    private _userControl: FormControl = new EmailControl();

    constructor(
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            user: this._userControl,
        });
    }

    get form$(): FormGroup {
        return this.form;
    }

    public get userControl(): EmailControl {
        return this.form$.get('user') as EmailControl;
    }


    resetForm(): void {
        this.userControl.patchValue(null);
    }

    ngOnDestroy(): void {
        this.resetForm();
    }
}
