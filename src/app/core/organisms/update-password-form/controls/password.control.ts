import { FormControl, Validators } from '@angular/forms';
import { PASSWORD_ERROR_MESSAGES } from '@parameters/form-error-message.parameter';
import { getErrorByFormControl } from '@helpers/control-error.helper';
import { GenericValidator } from '@validators/generic-validator';

export class PasswordControl extends FormControl {

    constructor() {
        super('');
        this.settingValidators();
    }

    private settingValidators() {
        this.setValidators([
            Validators.required,
            Validators.minLength(6),
            GenericValidator.validateAtLeastOneUpperCaseLetterExist,
            GenericValidator.validateAtLeastOneLowerCaseLetterExist,
            GenericValidator.validateAtLeastOneNumberOrCharacterExist,
        ]);
    }

    public get controlError(): string {
        return getErrorByFormControl(this, PASSWORD_ERROR_MESSAGES);
    }

    public get validMinLength() {
        return this.value && !this.hasError('minlength');
    }

    public get validUpperCase() {
        return this.value && !this.hasError('upperCaseError');
    }

    public get validLowerCase() {
        return this.value && !this.hasError('lowerCaseError');
    }

    public get validNumberOrCharacter() {
        return this.value && !this.hasError('numberOrCharacterError');
    }

}
