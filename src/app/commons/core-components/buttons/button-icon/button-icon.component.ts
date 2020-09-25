import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-icon[buttonIcon]',
  templateUrl: './button-icon.component.html',
  styleUrls: [ './button-icon.component.scss']
})
export class ButtonIconComponent {

  @Input()
  buttonIcon: string;

  @Input()
  buttonDisplay: 'block' | 'inline-block' = 'inline-block';

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  buttonDisabled = false;
}
