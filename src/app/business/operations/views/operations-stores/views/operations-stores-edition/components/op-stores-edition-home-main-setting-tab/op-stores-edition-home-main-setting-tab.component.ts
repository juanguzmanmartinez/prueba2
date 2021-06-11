import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { StoreServiceTypeList } from '../../../../models/operations-stores-service-type.model';

@Component({
    selector: 'app-op-stores-edition-home-main-setting-tab',
    templateUrl: './op-stores-edition-home-main-setting-tab.component.html',
    styleUrls: ['./op-stores-edition-home-main-setting-tab.component.sass']
})
export class OpStoresEditionHomeMainSettingTabComponent implements OnInit {

    @Input() storeServiceTypeList: StoreServiceTypeList;
    @Input() homeEditionLoader: boolean;

    @Output() edit = new EventEmitter<EDeliveryServiceType>();
    @Output() add = new EventEmitter<EDeliveryServiceType>();

    constructor() {
    }

    ngOnInit(): void {
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        this.edit.emit(serviceType);
    }

    addServiceType(serviceType: EDeliveryServiceType) {
        this.add.emit(serviceType);
    }

}
