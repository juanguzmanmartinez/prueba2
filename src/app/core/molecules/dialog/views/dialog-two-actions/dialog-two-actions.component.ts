import { Component, Input, OnInit } from '@angular/core';

@Component({
    templateUrl: 'dialog-two-actions.component.html',
    styleUrls: ['dialog-two-actions.component.sass']
})
export class DialogTwoActionsComponent implements OnInit {

    @Input() title: string;
    @Input() description: string;
    @Input() primaryAction: string;
    @Input() secondaryAction: string;

    @Input() fontName: string;
    @Input() fontClass: string;
    @Input() svgName: string;

    constructor() {
    }

    ngOnInit() {
    }

}
