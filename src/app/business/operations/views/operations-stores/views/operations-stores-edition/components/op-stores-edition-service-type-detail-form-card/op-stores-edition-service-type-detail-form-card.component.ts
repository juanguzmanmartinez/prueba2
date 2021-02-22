import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-op-stores-edition-service-type-detail-form-card',
  templateUrl: './op-stores-edition-service-type-detail-form-card.component.html',
  styleUrls: ['./op-stores-edition-service-type-detail-form-card.component.sass']
})
export class OpStoresEditionServiceTypeDetailFormCardComponent implements OnInit {

  @Output() cancelServiceTypeEdition = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  cancelServiceTypeEditionEvent() {
    this.cancelServiceTypeEdition.emit();
  }
}
