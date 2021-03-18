import { FormControl, Validators } from '@angular/forms';
import { getErrorByFormControl } from '@helpers/control-error.helper';
import { CODE_ERROR_MESSAGES } from '@parameters/form-error-message.parameter';
import { GenericValidator } from '@validators/generic-validator';

export class CodeControl extends FormControl {

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
        return getErrorByFormControl(this, CODE_ERROR_MESSAGES);
    }

    public get hasWrongDataError() {
        return this.hasError('wrongData');
    }
}
