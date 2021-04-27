import { Component, Input, OnInit } from '@angular/core';

@Component({
    templateUrl: 'dialog-warning.component.html',
    styleUrls: ['dialog-warning.component.sass']
})
export class DialogWarningComponent implements OnInit {

    @Input() title: string;
    @Input() description: string;
    @Input() action: string;

    constructor() {
    }

    ngOnInit() {
    }

}
