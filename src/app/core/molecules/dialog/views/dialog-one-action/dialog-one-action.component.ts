import { Component, Input, OnInit } from '@angular/core';

@Component({
    templateUrl: 'dialog-one-action.component.html',
    styleUrls: ['dialog-one-action.component.sass']
})
export class DialogOneActionComponent implements OnInit {

    @Input() title: string;
    @Input() description: string;
    @Input() action: string;

    @Input() fontName: string;
    @Input() fontClass: string;
    @Input() svgName: string;

    constructor() {
    }

    ngOnInit() {
    }

}
