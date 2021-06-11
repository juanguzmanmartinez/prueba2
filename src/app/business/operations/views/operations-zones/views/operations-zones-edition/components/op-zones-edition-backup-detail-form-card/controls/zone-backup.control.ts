import { FormControl, Validators } from '@angular/forms';

export class ZoneBackupControl extends FormControl {
    constructor() {
        super('');
        this.settingValidators();
    }

    private settingValidators() {
        this.setValidators([
            Validators.required,
        ]);
    }
}
