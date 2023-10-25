import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  @Input() innerClass = '';
  @Input() inlineStyle: { [klass: string]: any } | null;
  @Input() appearance: 'primary' | 'secondary' | 'outline' | 'default' =
    'default';
  @Input() behavior: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter();
}
