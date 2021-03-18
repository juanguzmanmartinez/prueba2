import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { parseUrl } from '@helpers/parse-url.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { Subscription } from 'rxjs';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { IZoneServiceTypeUpdate } from '@interfaces/zones/zones.interface';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { AlertService } from '@molecules/alert/alert.service';
import { ZonesStoreServiceType } from '../../../../models/operations-zones-store.model';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { ZoneServiceType } from '../../../../models/operations-zones-service-type.model';

@Component({
    selector: 'app-operations-zones-edition-service-type',
    templateUrl: './operations-zones-edition-service-type.component.html',
    styleUrls: ['./operations-zones-edition-service-type.component.sass']
})
export class OperationsZonesEditionServiceTypeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public zoneDetail: ZoneDetail;
    public serviceType: EDeliveryServiceType;
    public zoneServiceType: ZoneServiceType;
    public zonesStoreServiceType: ZonesStoreServiceType;
    public serviceTypeName = CDeliveryServiceTypeName;

    public serviceTypeEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _dialogConfirmChanges: DialogConfirmChangesService,
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        this.getZoneDetail();
        const path = this._activatedRoute.snapshot.routeConfig.path;
        this.serviceType = Object.keys(CDeliveryServiceTypeRoute)
            .find((key) => CDeliveryServiceTypeRoute[key] === path) as EDeliveryServiceType;
        this.setZoneServiceType();
    }


    getZoneDetail() {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail: ZoneDetail) => {
                this.zoneDetail = zoneDetail;
                this.setZoneServiceType();
            }, () => {
                this.zoneDetail = null;
                this.serviceTypeEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    private setZoneServiceType() {
        this.zoneServiceType = this.zoneDetail?.serviceTypeList
            .find((serviceType: ZoneServiceType) => serviceType.code === this.serviceType);
        this.zonesStoreServiceType = this.zoneDetail?.assignedStore.serviceTypeList
            .find((serviceType: ZonesStoreServiceType) => serviceType.code === this.serviceType);
        this.serviceTypeEditionLoader = !this.zoneDetail;
    }

    putServiceType(zoneServiceTypeUpdate: IZoneServiceTypeUpdate) {
        this._operationsZonesImplement.putZoneServiceType(
            `${this.zoneServiceType.id}`, zoneServiceTypeUpdate)
            .subscribe(() => {
                this._operationsZonesEditionStore.updateZoneDetail = true;
                this._alert.alertSuccess(OperationMessages.successServiceTypeEdition(
                    this.serviceTypeName[this.zoneServiceType.code], this.zoneDetail.name));
                this.backRoute();
            }, () => {
                this._alert.alertError(OperationMessages.errorServiceTypeEdition(
                    this.serviceTypeName[this.zoneServiceType.code], this.zoneDetail.name));
                this.backRoute();
            });
    }


    cancelEdition() {
        this.backRoute();
    }

    saveEdition(zoneServiceTypeUpdate: IZoneServiceTypeUpdate) {
        this.saveEditionLoader = true;
        const subscription = this._dialogConfirmChanges.open()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.putServiceType(zoneServiceTypeUpdate);
                } else {
                    this.saveEditionLoader = false;
                }
            });
        this.subscriptions.push(subscription);
    }

    backRoute() {
        const backRoute = parseUrl(this._router.url, '..');
        this._router.navigate([backRoute]);
    }

    zoneListRoute() {
        this._router.navigate([CONCAT_PATH.operationZones]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
