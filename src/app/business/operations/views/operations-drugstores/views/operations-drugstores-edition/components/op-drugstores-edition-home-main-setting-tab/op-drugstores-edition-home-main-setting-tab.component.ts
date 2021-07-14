import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DrugstoreServiceTypeList } from '../../../../models/operations-drugstores-service-type.model';

@Component({
    selector: 'app-op-drugstores-edition-home-main-setting-tab',
    templateUrl: './op-drugstores-edition-home-main-setting-tab.component.html',
    styleUrls: ['./op-drugstores-edition-home-main-setting-tab.component.sass']
})
export class OpDrugstoresEditionHomeMainSettingTabComponent implements OnInit {

    @Input() drugstoreServiceTypeList: DrugstoreServiceTypeList;
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
