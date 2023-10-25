import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fp-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() innerClass = '';
  @Input() value: any = null;
  @Input() checked: boolean = false;
  @Output() onChange = new EventEmitter();
}
