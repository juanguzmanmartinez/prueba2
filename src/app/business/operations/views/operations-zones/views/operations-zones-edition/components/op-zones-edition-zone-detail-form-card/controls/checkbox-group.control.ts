import { FormControl, FormGroup } from '@angular/forms';

export class CheckboxGroupControlName {
    static value = 'name';
    static checked = 'checked';
}

export class CheckboxGroupControl extends FormGroup {
    constructor(name: string) {
        super({
            [CheckboxGroupControlName.value]: new FormControl(name),
            [CheckboxGroupControlName.checked]: new FormControl(false),
        });
    }

    get valueControl() {
        return this.get(CheckboxGroupControlName.value) as FormControl;
    }

    get checkedControl(): FormControl {
        return this.get(CheckboxGroupControlName.checked) as FormControl;
    }
}
