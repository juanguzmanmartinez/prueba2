import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-select-tab',
    templateUrl: './select-tab.component.html',
    styleUrls: ['./select-tab.component.sass']
})
export class SelectTabComponent implements OnInit {

    public optionControl = new FormControl(null);

    @Input() optionList: string[] = [];

    @Input('value')
    set value(value: string) {
        const validValue = value !== null && value !== undefined ? value : this.optionList[0];
        this.optionControl.patchValue(validValue);
    }

    @Input('disabled')
    set disabled(disabled: boolean) {
        if (disabled) {
            this.optionControl.disable();
        } else {
            this.optionControl.enable();
        }
    }

    @Output() optionChange = new EventEmitter();

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor() {
    }

    ngOnInit(): void {
    }


    changeSelectTab() {
        this.optionChange.emit(this.optionControl.value);
    }


}
