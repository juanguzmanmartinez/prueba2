import { Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-select-tab',
    templateUrl: './select-tab.component.html',
    styleUrls: ['./select-tab.component.scss']
})
export class SelectTabComponent implements OnInit, OnDestroy {

    @Input() selectTabList: Array<string> = [];

    @Input('selectTabValue')
    set selectTabValue(value: string) {
        this._selectTabValue = value !== null && value !== undefined ? value : this.selectTabList[0];
        if (this.selectTabControl && (this._selectTabValue !== value)) {
            this.selectTabControl.setValue(this._selectTabValue);
        }
    }

    @Input('selectTabDisabled')
    set selectTabDisabled(disabled: boolean) {
        this._selectTabDisabled = disabled || false;
        if (this.selectTabControl) {
            disabled ?
                this.selectTabControl.disable() :
                this.selectTabControl.enable();
        }
    }

    public _selectTabFormGroup = new FormGroup({});
    public _selectTabFormControlName = 'selectTabRadio';
    public _selectTabValue = '';
    public _selectTabDisabled = false;
    private selectTabSubscribe: Subscription;

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    onChange = (_: any) => {};

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this._selectTabFormGroup = this._formBuilder.group({
            selectTabRadio: {value: this._selectTabValue, disabled: this._selectTabDisabled}
        });

        this.changeSelectTabValue();
    }

    ngOnDestroy() {
        if (this.selectTabSubscribe) {
            this.selectTabSubscribe.unsubscribe();
        }
    }

    get selectTabControl() {
        return this._selectTabFormGroup.controls[this._selectTabFormControlName];
    }

    changeSelectTabValue() {
        this.selectTabSubscribe = this.selectTabControl.valueChanges.subscribe((value) => {
            this._selectTabValue = value;
            this.onChange(this._selectTabValue);
        });

    }


}
