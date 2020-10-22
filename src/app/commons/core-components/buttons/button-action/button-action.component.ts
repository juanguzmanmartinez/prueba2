import {Component, Input, OnInit} from '@angular/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss']
})
export class ButtonActionComponent extends ButtonComponent implements OnInit {

  @Input()
  buttonIcon: string;

  @Input()
  buttonActionSize: 'small' | 'large' = 'small';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
