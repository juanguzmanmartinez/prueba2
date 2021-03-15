import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-select-tab',
    templateUrl: './select-tab.component.html',
    styleUrls: ['./select-tab.component.scss']
})
export class SelectTabComponent implements OnInit {

    public _selectTabValue = '';
    public _selectTabDisabled = false;

    @Input() selectTabList: string[] = [];

    @Input('selectTabValue')
    set selectTabValue(value: string) {
        const selectTabValue = value !== null && value !== undefined ? value : this.selectTabList[0];
        if (this._selectTabValue !== value) {
            this._selectTabValue = selectTabValue;
        }
    }

    @Input('selectTabDisabled')
    set selectTabDisabled(disabled: boolean) {
        this._selectTabDisabled = disabled || false;
    }

    @Output() selectTabSelection = new EventEmitter();

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor() {
    }

    ngOnInit(): void {
    }

    changeSelectTabValue() {
        this.selectTabSelection.emit(this._selectTabValue);
    }


}
