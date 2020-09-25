import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-outline',
  templateUrl: './button-outline.component.html'
})
export class ButtonOutlineComponent {

  @Input()
  buttonDisplay: 'block' | 'flex' | 'inline-block' = 'inline-block';

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  buttonClass: string;

  @Input()
  buttonStyle: { [klass: string]: any; } | null;

}
