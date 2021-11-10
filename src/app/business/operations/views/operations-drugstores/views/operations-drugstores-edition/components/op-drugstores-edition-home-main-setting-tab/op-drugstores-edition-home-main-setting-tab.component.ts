import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DrugstoreServiceTypeList } from '../../../../models/operations-drugstores-service-type.model';

@Component({
  selector: 'app-op-drugstores-edition-home-main-setting-tab',
  templateUrl: './op-drugstores-edition-home-main-setting-tab.component.html',
  styleUrls: ['./op-drugstores-edition-home-main-setting-tab.component.sass']
})
export class OpDrugstoresEditionHomeMainSettingTabComponent {

  @Input() drugstoreServiceTypeList: DrugstoreServiceTypeList;
  @Input() homeEditionLoader: boolean;

  @Output() edit = new EventEmitter<EDeliveryServiceType>();
  @Output() add = new EventEmitter<EDeliveryServiceType>();

  constructor() { }

  editServiceType(serviceType: EDeliveryServiceType): void {
    this.edit.emit(serviceType);
  }

  addServiceType(serviceType: EDeliveryServiceType): void {
    this.add.emit(serviceType);
  }

}
