import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carrier-header',
  templateUrl: './carrier-header.component.html',
})
export class CarrierHeaderComponent {
  @Output() download = new EventEmitter();
  @Input() loadingTable: boolean;
}
