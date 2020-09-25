import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html'
})
export class ButtonPrimaryComponent {

  @Input()
  buttonSize: 'small' | 'large' | 'regular' = 'regular';

  @Input()
  buttonDisplay: 'block' | 'flex' | 'inline-block' = 'inline-block';

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  buttonStyle: { [klass: string]: any; } | null;

  @Input()
  buttonDisabled = false;
}
