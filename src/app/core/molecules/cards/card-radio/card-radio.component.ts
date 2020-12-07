import { Component, OnInit, Self } from '@angular/core';
import { RadioComponent } from '../../../atoms/radio/radio.component';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-card-radio',
  templateUrl: './card-radio.component.html',
  styleUrls: ['./card-radio.component.scss']
})
export class CardRadioComponent extends RadioComponent implements OnInit {

  constructor(@Self() public ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {
  }

}
