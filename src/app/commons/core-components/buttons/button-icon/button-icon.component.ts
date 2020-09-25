import {Component, Input} from '@angular/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-button-icon[buttonIcon]',
  templateUrl: './button-icon.component.html',
  styleUrls: [ './button-icon.component.scss']
})
export class ButtonIconComponent extends ButtonComponent {

  @Input()
  buttonIcon: string;

}
