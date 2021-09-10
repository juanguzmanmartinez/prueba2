import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsZonesEditionStoreService, TZoneBackup, TZoneDetail } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { AlertService } from '@molecules/alert/alert.service';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { Subscription } from 'rxjs';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';
import { ZoneBackupServiceType, ZoneServiceType } from '../../../../models/operations-zones-service-type.model';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { RouterHelperService } from '@helpers/router-helper.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-operations-zones-edition-backup-service-type',
    templateUrl: './operations-zones-edition-backup-service-type.component.html',
    styleUrls: ['./operations-zones-edition-backup-service-type.component.sass']
})
export class OperationsZonesEditionBackupServiceTypeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public serviceTypeName = CDeliveryServiceTypeName;
    public serviceType: EDeliveryServiceType;

    public zoneDetail: ZoneDetail;
    public zoneDetailError: HttpErrorResponse;

    public zoneBackupDetail: ZoneDetail;
    public zoneBackupServiceType: ZoneBackupServiceType;
    public zoneBackupDetailError: HttpErrorResponse;

    public errorResponse: HttpErrorResponse;
    public editionBackupServiceTypeLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _dialogTwoActions: DialogTwoActionsService,
        private _alert: AlertService,
        private _routerHelper: RouterHelperService
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
            .subscribe((zoneDetail: TZoneDetail) => {
                if (zoneDetail instanceof ZoneDetail) {
                    this.zoneDetail = zoneDetail;
                } else {
                    this.zoneDetail = null;
                    this.zoneDetailError = zoneDetail;
                }
            });
        this.subscriptions.push(subscription);
    }

    getZoneBackupDetail() {
        const subscription = this._operationsZonesEditionStore.zoneBackup$
            .subscribe((zoneBackupDetail: TZoneBackup) => {
                if (zoneBackupDetail instanceof ZoneDetail) {
                    this.zoneBackupDetail = zoneBackupDetail;
                    this.setZoneBackupServiceType();
                } else {
                    this.zoneBackupDetail = null;
                    if (zoneBackupDetail instanceof HttpErrorResponse) {
                        this.zoneBackupDetailError = zoneBackupDetail;
                    }
                }

                this.settingData();
            });
        this.subscriptions.push(subscription);
    }

    settingData() {
        this.errorResponse = this.zoneDetailError || this.zoneBackupDetailError;
        this.editionBackupServiceTypeLoader = false;
    }

    private setZoneBackupServiceType() {
        const zoneServiceType = this.zoneBackupDetail?.serviceTypeList
            .find((serviceType: ZoneServiceType) => serviceType.code === this.serviceType);
        const forceService = this.serviceType === EDeliveryServiceType.amPm ?
            this.zoneDetail?.zoneBackup?.forceServiceAMPM : this.zoneDetail?.zoneBackup?.forceServiceSCHEDULED;
        this.zoneBackupServiceType = zoneServiceType ? new ZoneBackupServiceType(zoneServiceType, forceService) : null;
        this.editionBackupServiceTypeLoader = !this.zoneBackupServiceType;
    }

    putBackupServiceType(zoneBackupUpdate: IZoneBackupUpdate) {
        this._operationsZonesImplement.putZoneBackup(
            this.zoneDetail.id, zoneBackupUpdate)
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
        const subscription = this._dialogTwoActions.openConfirmChanges()
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
        this._routerHelper.backRoute();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
