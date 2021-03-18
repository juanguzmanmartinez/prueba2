import { FormControl } from '@angular/forms';
import { PASSWORD_ERROR_MESSAGES } from '@parameters/form-error-message.parameter';
import { getErrorByFormControl } from '@helpers/control-error.helper';
import { GenericValidator } from '@validators/generic-validator';

export class ConfirmPasswordControl extends FormControl {

    constructor(controlToCompare: string) {
        super('');
        this.settingValidators(controlToCompare);
    }

    private settingValidators(controlToCompare: string) {
        this.setValidators([
            GenericValidator.compareWithSiblingControlValue(controlToCompare)
        ]);
    }

    public get controlError(): string {
        return getErrorByFormControl(this, PASSWORD_ERROR_MESSAGES);
    }

    public get hasDifferentValuesError(): boolean {
        return this.touched && this.hasError('differentValues');
    }

}
