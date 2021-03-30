import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZoneServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';

@Component({
    selector: 'app-op-zones-edition-home-main-setting-tab',
    templateUrl: './op-zones-edition-home-main-setting-tab.component.html',
    styleUrls: ['./op-zones-edition-home-main-setting-tab.component.sass']
})
export class OpZonesEditionHomeMainSettingTabComponent implements OnInit {

    @Input() zoneServiceTypeList: ZoneServiceTypeList;
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
