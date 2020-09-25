import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-icon[buttonIcon]',
  templateUrl: './button-icon.component.html'
})
export class ButtonIconComponent {

  @Input()
  buttonIcon: string;

  @Input()
  buttonClass: string;

  @Input()
  buttonDisplay: 'block' | 'inline-block' = 'inline-block';

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';

}
