import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button-action-text',
    templateUrl: './button-action-text.component.html',
    styleUrls: ['./button-action-text.component.scss']
})
export class ButtonActionTextComponent {

    @Input()
    active: boolean;

    @Input()
    innerClass = '';

    @Input()
    inlineStyle: { [klass: string]: any; } | null;

    @Input()
    disabled = false;

    @Output() clicked = new EventEmitter();

}
