import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-op-stores-edition-service-type-form-card',
  templateUrl: './op-stores-edition-service-type-form-card.component.html',
  styleUrls: ['./op-stores-edition-service-type-form-card.component.sass']
})
export class OpStoresEditionServiceTypeFormCardComponent implements OnInit {

  @Output() cancelServiceTypeEdition = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  cancelServiceTypeEditionEvent() {
    this.cancelServiceTypeEdition.emit();
  }
}
