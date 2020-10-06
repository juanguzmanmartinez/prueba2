import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent implements OnInit {


  @Input() checkboxDisabled: any;
  @Input() checkboxValue: any;
  @Input() checkboxChecked: any;
  @Input() checkboxName: any = 'radio';
  @Input() checkboxClass: any;

  onChange = (_: any) => {
  }
  onTouched = (_: any) => {
  }


  constructor() {
  }

  ngOnInit(): void {
  }

  chooseCheckbox() {
    this.onChange(this.checkboxValue);
  }

}
