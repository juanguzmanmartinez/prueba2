import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
    @Input()
    innerClass = '';

    @Input()
    inlineStyle: { [klass: string]: any; } | null;

    @Input()
    type: 'primary' | 'secondary' | 'outline' | 'ghost' | 'default' = 'default';

    @Input()
    behavior: 'button' | 'submit' | 'reset' = 'button';

    @Input()
    disabled = false;

    onClick = (_: any) => {};

}
