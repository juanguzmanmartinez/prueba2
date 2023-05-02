import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;

  @Output() click = new EventEmitter();
}
