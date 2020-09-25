import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-ghost',
  templateUrl: './button-ghost.component.html'
})
export class ButtonGhostComponent {

  @Input()
  buttonSize: 'small' | 'regular' = 'regular';

  @Input()
  buttonColor: 'red';

  @Input()
  buttonDisplay: 'block' | 'flex' | 'inline-block' = 'inline-block';

  @Input()
  buttonType: 'button' | 'submit' | 'reset' = 'button';


}
