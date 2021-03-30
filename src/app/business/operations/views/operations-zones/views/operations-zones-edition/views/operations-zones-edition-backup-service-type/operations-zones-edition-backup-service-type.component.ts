import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { AlertService } from '@molecules/alert/alert.service';
import { CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { Subscription } from 'rxjs';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';
import { parseUrl } from '@helpers/parse-url.helper';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { ZoneBackupServiceType, ZoneServiceType } from '../../../../models/operations-zones-service-type.model';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';

@Component({
    selector: 'app-operations-zones-edition-backup-service-type',
    templateUrl: './operations-zones-edition-backup-service-type.component.html',
    styleUrls: ['./operations-zones-edition-backup-service-type.component.sass']
})
export class OperationsZonesEditionBackupServiceTypeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public zoneDetail: ZoneDetail;
    public zoneBackupDetail: ZoneDetail;
    public serviceType: EDeliveryServiceType;
    public zoneBackupServiceType: ZoneBackupServiceType;

    public backupServiceTypeEditionLoader = true;
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
        this.getZoneBackupDetail();
        const path = this._activatedRoute.snapshot.routeConfig.path;
        this.serviceType = Object.keys(CDeliveryServiceTypeRoute)
            .find((key) => path.includes(CDeliveryServiceTypeRoute[key])) as EDeliveryServiceType;
        this.setZoneBackupServiceType();
    }


    getZoneDetail() {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail: ZoneDetail) => {
                this.zoneDetail = zoneDetail;
            }, () => {
                this.zoneDetail = null;
                this.backupServiceTypeEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    getZoneBackupDetail() {
        const subscription = this._operationsZonesEditionStore.zoneBackup$
            .subscribe((zoneBackupDetail: ZoneDetail) => {
                this.zoneBackupDetail = zoneBackupDetail;
                this.setZoneBackupServiceType();
            }, () => {
                this.zoneBackupDetail = null;
                this.backupServiceTypeEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    private setZoneBackupServiceType() {
        const zoneServiceType = this.zoneBackupDetail?.serviceTypeList
            .find((serviceType: ZoneServiceType) => serviceType.code === this.serviceType);
        const forceService = this.serviceType === EDeliveryServiceType.amPm ?
            this.zoneDetail?.zoneBackup?.forceServiceAMPM : this.zoneDetail?.zoneBackup?.forceServiceSCHEDULED;
        this.zoneBackupServiceType = zoneServiceType ? new ZoneBackupServiceType(zoneServiceType, forceService) : null;
        this.backupServiceTypeEditionLoader = !this.zoneBackupServiceType;
    }

    putBackupServiceType(zoneBackupUpdate: IZoneBackupUpdate) {
        this._operationsZonesImplement.putZoneBackup(
            this.zoneDetail.code, zoneBackupUpdate)
            .subscribe(() => {
                this._operationsZonesEditionStore.updateZoneDetail = true;
                this._alert.alertSuccess(OperationMessages.successOperationEdition(this.zoneDetail.name));
                this.backRoute();
            }, () => {
                this._alert.alertError(OperationMessages.errorOperationEdition(this.zoneDetail.name));
                this.backRoute();
            });
    }

    cancelEdition() {
        this.backRoute();
    }

    saveEdition(zoneBackupUpdate: IZoneBackupUpdate) {
        this.saveEditionLoader = true;
        const subscription = this._dialogConfirmChanges.open()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.putBackupServiceType(zoneBackupUpdate);
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
