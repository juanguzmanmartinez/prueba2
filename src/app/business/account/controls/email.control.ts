import { FormControl, Validators } from '@angular/forms';
import { EMAIL_ERROR_MESSAGES } from '@parameters/form-error-message.parameter';
import { getErrorByFormControl } from '@helpers/control-error.helper';
import { GenericValidator } from '@validators/generic-validator';

export class EmailControl extends FormControl {

    constructor() {
        super('');
        this.settingValidators();
    }

    public settingValidators() {
        this.setValidators([
            Validators.required,
            Validators.email,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
        ]);
        this.updateValueAndValidity();
    }

    public settingWrongDataValidator() {
        this.setValidators([GenericValidator.wrongData()]);
        this.updateValueAndValidity();
    }

    public get controlError(): string {
        return getErrorByFormControl(this, EMAIL_ERROR_MESSAGES);
    }


}
