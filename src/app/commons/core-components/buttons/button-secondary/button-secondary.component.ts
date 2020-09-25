import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html'
})
export class ButtonSecondaryComponent {

  @Input()
  buttonDisplay: 'block' | 'flex' | 'inline-block' = 'inline-block';

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  buttonStyle: { [klass: string]: any; } | null;
}
