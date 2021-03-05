import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZonesServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { IZoneServiceTypRegister } from '@interfaces/zones/zones.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZonesMessages } from '../../../../parameters/operations-zones-messages.parameter';
import { AlertService } from '@molecules/alert/alert.service';

@Component({
    selector: 'app-operations-zones-edition-home',
    templateUrl: './operations-zones-edition-home.component.html',
    styleUrls: ['./operations-zones-edition-home.component.sass']
})
export class OperationsZonesEditionHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public deliveryServiceType = EDeliveryServiceType;
    public zoneDetail: ZoneDetail;
    public zonesServiceTypeList: ZonesServiceTypeList;
    private serviceTypeName = CDeliveryServiceTypeName;

    public editionHomeLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
        private _dialogConfirmChanges: DialogConfirmChangesService,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail) => {
                this.editionHomeLoader = false;
                this.zoneDetail = zoneDetail;
                this.zonesServiceTypeList = new ZonesServiceTypeList(zoneDetail.serviceTypeList);
            });
        this.subscriptions.push(subscription);
    }

    editStore() {
        this._router.navigate([CONCAT_PATH.opZones_ZoneEdition(`${this.zoneDetail.id}`)]);
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        const zoneIdPath = CONCAT_PATH.opZones_ZoneId(`${this.zoneDetail.id}`);
        const serviceTypePath = `${zoneIdPath}/${CDeliveryServiceTypeRoute[serviceType]}`;
        this._router.navigate([serviceTypePath]);
    }

    addServiceType(serviceType: EDeliveryServiceType) {
        const subscription = this._dialogConfirmChanges.open()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.registerServiceType(serviceType);
                }
            });
        this.subscriptions.push(subscription);
    }

    registerServiceType(serviceType: EDeliveryServiceType) {
        const zoneServiceTypRegister = {
            serviceTypeCode: serviceType,
            endHour: DatesHelper.Date(this.zoneDetail.assignedStore.startHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinute24Hours),
            startHour: DatesHelper.Date(this.zoneDetail.assignedStore.endHour, DATES_FORMAT.millisecond)
                .format(DATES_FORMAT.hourMinute24Hours),
            segmentGap: '30',
            zoneId: this.zoneDetail.idKey
        } as IZoneServiceTypRegister;

        this._operationsZonesImplement.postZoneServiceType(zoneServiceTypRegister)
            .subscribe(() => {
                this.editionHomeLoader = true;
                this._operationsZonesEditionStore.updateZoneDetail = true;
                this._alert.alertSuccess(ZonesMessages.successServiceTypeRegistered(this.serviceTypeName[serviceType], this.zoneDetail.name));
            }, () => {
                this._alert.alertError(ZonesMessages.errorServiceTypeRegistered(this.serviceTypeName[serviceType], this.zoneDetail.name));
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
