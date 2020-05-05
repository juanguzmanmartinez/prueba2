import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-customer',
  templateUrl: './buttons-customer.component.html',
  styleUrls: ['./buttons-customer.component.scss']
})
export class ButtonsCustomerComponent implements OnInit {

  @Input() isDisabled = false;
  @Output() onclick = new EventEmitter();

  constructor( ) { }

  ngOnInit(): void {

  }

  public buttonClick() {
    if (!this.isDisabled) {
      this.onclick.emit();
    }
  }
}
