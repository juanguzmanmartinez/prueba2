import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent {

  @Input()
  buttonDisplay: 'block' | 'flex' | 'inline-block' = 'inline-block';

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  buttonDisabled = false;
}
