import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdatePasswordForm } from './form/update-password.form';

@Component({
    selector: 'app-update-password-form',
    templateUrl: './update-password-form.component.html',
    styleUrls: ['./update-password-form.component.scss'],
    providers: [UpdatePasswordForm]
})
export class UpdatePasswordFormComponent implements OnInit {

    public capsLock: boolean;

    @Input() appearance: 'dialog' | 'default' = 'default';
    @Output() formSubmitEvent = new EventEmitter<string>();
    @Output() formCancelEvent = new EventEmitter();

    constructor(
        public recoverPasswordResetForm: UpdatePasswordForm,
    ) {
    }

    ngOnInit(): void {
    }

    resetPasswordForm() {
        this.recoverPasswordResetForm.resetForm();
    }

    formSubmit(): void {
        this.formSubmitEvent.emit(this.recoverPasswordResetForm.passwordControl.value);
    }

    formCancel(): void {
        this.formCancelEvent.emit();
    }
}
