import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input()
  buttonClass: string;

  @Input()
  buttonStyle: { [klass: string]: any; } | null;

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  buttonDisabled = false;

  onClick = (_: any) => {
  }

  buttonClick(event) {
    this.onClick(event);
  }
}
