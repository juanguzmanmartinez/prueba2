import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent {

    @Input() fontName: string;
    @Input() fontColor: string;
    @Input() fontSize: '16px' | '24px' | '32px' | '48px' | string = '16px';

    @Input() svgName: string;
    @Input() svgWidth: '16px' | '24px' | '32px' | '48px' | string = '16px';
    @Input() svgHeight: '16px' | '24px' | '32px' | '48px' | string;

    @Input() innerClass: string;

    constructor() {
    }

}
