import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdatePasswordForm } from './form/update-password.form';
import { AlertService } from '@molecules/alert/alert.service';
import { CUpdatePasswordMessages } from '@organisms/update-password-form/parameters/update-password-messages.parameter';

@Component({
    selector: 'app-update-password-form',
    templateUrl: './update-password-form.component.html',
    styleUrls: ['./update-password-form.component.scss'],
    providers: [UpdatePasswordForm]
})
export class UpdatePasswordFormComponent implements OnInit {

    public capsLock: boolean;

    @Input() appearance: 'dialog' | 'default' = 'default';
    @Output() formSubmitEvent = new EventEmitter();
    @Output() formCancelEvent = new EventEmitter();

    constructor(
        public recoverPasswordResetForm: UpdatePasswordForm,
        private  alertService: AlertService,
    ) {
    }

    ngOnInit(): void {
    }

    formSubmit(): void {
        // this.alertService.alertError(CUpdatePasswordMessages.error);
        this.alertService.alertSuccess(CUpdatePasswordMessages.success);
        this.formSubmitEvent.emit();
    }


    formCancel(): void {
        this.formCancelEvent.emit();
    }
}
