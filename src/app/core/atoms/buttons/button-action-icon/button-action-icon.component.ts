import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button-action-icon[iconName]',
    templateUrl: './button-action-icon.component.html',
    styleUrls: ['./button-action-icon.component.scss']
})
export class ButtonActionIconComponent {

    @Input()
    iconName: string;

    @Input()
    innerClass = '';

    @Input()
    inlineStyle: { [klass: string]: any; } | null;

    @Input()
    disabled = false;

    @Output() clicked = new EventEmitter();

}
