import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconsComponent {

    @Input() iconClass: string;

    @Input() iconFontName: string;
    @Input() iconFontColor: string;
    @Input() iconFontSize: '16px' | '24px' | '32px' | '48px' | string = '16px';

    @Input() iconSvgName: string;
    @Input() iconSvgWidth: '16px' | '24px' | '32px' | '48px' | string = '16px';
    @Input() iconSvgHeight: '16px' | '24px' | '32px' | '48px' | string;

    constructor() {
    }

}
