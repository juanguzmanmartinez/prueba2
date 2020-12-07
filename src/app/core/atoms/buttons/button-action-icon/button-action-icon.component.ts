import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-button-action-icon',
  templateUrl: './button-action-icon.component.html',
  styleUrls: ['./button-action-icon.component.scss']
})
export class ButtonActionIconComponent extends ButtonComponent implements OnInit {

  @Input()
  iconName: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
