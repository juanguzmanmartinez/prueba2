import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dialog-header',
    templateUrl: './dialog-header.component.html'
})
export class DialogHeaderComponent {


    @Input() fontName: string;
    @Input() fontClass: string;
    @Input() svgName: string;

    @Input() containerClass: string;

    constructor() {
    }

}
