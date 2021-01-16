import { FormControl, Validators } from '@angular/forms';
import { getErrorByFormControl } from '@helpers/control-error.helper';
import { PASSWORD_ERROR_MESSAGES } from '@parameters/form-error-message.parameter';
import { GenericValidator } from '@validators/generic-validator';

export class LoginPasswordControl extends FormControl {

    constructor() {
        super('');
        this.settingValidators();
    }

    public settingValidators() {
        this.setValidators([
            Validators.required,
            Validators.minLength(6)
        ]);
        this.updateValueAndValidity();
    }

    public settingWrongDataValidator() {
        this.setValidators([GenericValidator.wrongData()]);
        this.updateValueAndValidity();
    }

    public get controlError(): string {
        return getErrorByFormControl(this, PASSWORD_ERROR_MESSAGES);
    }

    public get hasWrongDataError() {
        return this.hasError('wrongData');
    }
}
