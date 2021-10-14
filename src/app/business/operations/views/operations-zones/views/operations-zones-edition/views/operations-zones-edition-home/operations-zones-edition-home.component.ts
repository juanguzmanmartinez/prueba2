import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceTypeList, ZoneChannelServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { OperationsZonesEditionStoreService, TZoneBackup, TZoneDetail } from '../../stores/operations-zones-edition-store.service';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { IZoneServiceTypeRegister } from '@interfaces/zones/zones.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { AlertService } from '@molecules/alert/alert.service';
import { ZonesStoreServiceType } from '../../../../models/operations-zones-store.model';
import { CChannelRoute, EChannel } from '@models/channel/channel.model';
import { CZoneServiceTypeSegmentGap, ZoneServiceTypeBasicRequest } from '../../../../parameters/operations-zones-service-type.parameter';
import { OperationsZonesEditionActionsStoreService } from '../../stores/operations-zones-edition-actions-store.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-operations-zones-edition-home',
    templateUrl: './operations-zones-edition-home.component.html',
    styleUrls: ['./operations-zones-edition-home.component.sass']
})
export class OperationsZonesEditionHomeComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private serviceTypeName = CDeliveryServiceTypeName;
    public deliveryServiceType = EDeliveryServiceType;

    public zoneDetail: ZoneDetail;
    public zoneServiceTypeList: ZoneChannelServiceTypeList[];
    public zoneDetailError: HttpErrorResponse;

    public zoneBackupDetail: ZoneDetail;
    public zoneBackupServiceTypeList: ZoneBackupServiceTypeList = new ZoneBackupServiceTypeList([]);
    public zoneBackupDetailError: HttpErrorResponse;

    public errorResponse: HttpErrorResponse;
    public homeEditionLoader = true;
    public saveEditionLoader: boolean;
    public updateEditionLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
        @SkipSelf() private _operationsZonesEditionActionsStore: OperationsZonesEditionActionsStoreService,
        private _dialogTwoActions: DialogTwoActionsService,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _alert: AlertService,
    ) {
    }

    ngOnInit(): void {
        this.updateZoneDetail();
        this.getZoneDetail();
        this.getZoneBackup();
    }

    updateZoneDetail() {
        const subscription = this._operationsZonesEditionStore.updateZoneDetail$
            .subscribe(() => {
                this.updateEditionLoader = true;
            });
        this.subscriptions.push(subscription);
    }

    getZoneDetail() {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail: TZoneDetail) => {
                if (zoneDetail instanceof ZoneDetail) {
                    this.zoneDetail = zoneDetail;
                    this.zoneServiceTypeList = zoneDetail.channelList
                        .map((channel: EChannel) => new ZoneChannelServiceTypeList(
                            zoneDetail.serviceTypeList,
                            zoneDetail.assignedStore?.serviceTypeList || [],
                            channel));
                } else {
                    this.zoneDetail = null;
                    this.zoneServiceTypeList = null;
                    this.zoneDetailError = zoneDetail;
                }
            });
        this.subscriptions.push(subscription);
    }

    getZoneBackup() {
        const subscription = this._operationsZonesEditionStore.zoneBackup$
            .subscribe((zoneBackupDetail: TZoneBackup) => {
                if (zoneBackupDetail instanceof ZoneDetail) {
                    this.zoneBackupDetail = zoneBackupDetail;
                    this.zoneBackupServiceTypeList = new ZoneBackupServiceTypeList(zoneBackupDetail.serviceTypeList, this.zoneDetail.zoneBackup);
                } else {
                    this.zoneBackupDetail = null;
                    this.zoneBackupServiceTypeList = new ZoneBackupServiceTypeList([]);
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
        this.homeEditionLoader = false;
        this.saveEditionLoader = false;
        this.updateEditionLoader = false;
    }

    setTabSettingsSelectionIndex(index) {
        this._operationsZonesEditionActionsStore.tabSettingSelection = index;
    }

    get tabSettingsSelectionIndex(): number {
        return this._operationsZonesEditionActionsStore.tabSettingSelection;
    }

    editZone() {
        this._router.navigate([ROUTER_PATH.opZones_ZoneEdition(this.zoneDetail.id)]);
    }

    editServiceType(serviceType: ZoneServiceTypeBasicRequest) {
        const serviceTypePath = ROUTER_PATH.opZones_ZoneServiceTypeEdition(
            CDeliveryServiceTypeRoute[serviceType.code],
            this.zoneDetail.id,
            CChannelRoute[serviceType.channel]
        );
        this._router.navigate([serviceTypePath]);
    }

    addServiceType(serviceType: ZoneServiceTypeBasicRequest) {
        const subscription = this._dialogTwoActions.openInfo({
            title: `Añadir servicio ${this.serviceTypeName[serviceType.code]}`,
            description: `¿Deseas añadir ${this.serviceTypeName[serviceType.code]} a la zona ${this.zoneDetail.name}?`,
            primaryAction: 'Añadir servicio',
            secondaryAction: 'Cancelar'
        })
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.registerServiceType(serviceType);
                }
            });
        this.subscriptions.push(subscription);
    }

    registerServiceType(serviceType: ZoneServiceTypeBasicRequest) {
        const assignedStoreServiceType = this.zoneDetail?.assignedStore.serviceTypeList
            .find((storeServiceType: ZonesStoreServiceType) => storeServiceType.code === serviceType.code);

        if (assignedStoreServiceType) {
            const zoneServiceTypRegister = {
                serviceTypeCode: serviceType.code,
                startHour: DatesHelper.Date(assignedStoreServiceType.startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
                endHour: DatesHelper.Date(assignedStoreServiceType.endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
                segmentGap: CZoneServiceTypeSegmentGap[serviceType.code].toString(),
                zoneId: this.zoneDetail.id,
                channel: serviceType.channel
            } as IZoneServiceTypeRegister;

            this._operationsZonesImplement.postZoneServiceType(zoneServiceTypRegister)
                .subscribe(() => {
                    this.saveEditionLoader = true;
                    this._operationsZonesEditionStore.updateZoneDetail = true;
                    this._alert.alertSuccess(OperationMessages.successServiceTypeRegistered(this.serviceTypeName[serviceType.code], this.zoneDetail.name));
                }, () => {
                    this._alert.alertError(OperationMessages.errorServiceTypeRegistered(this.serviceTypeName[serviceType.code], this.zoneDetail.name));
                });
        } else {
            this._alert.alertError(OperationMessages.errorServiceTypeRegistered(this.serviceTypeName[serviceType.code], this.zoneDetail.name));
        }
    }

    editBackupZone() {
        this._router.navigate([ROUTER_PATH.opZones_ZoneBackupEdition(this.zoneDetail.id)]);
    }

    editBackupServiceType(serviceType: EDeliveryServiceType) {
        let serviceTypePath;
        switch (serviceType) {
            case EDeliveryServiceType.amPm:
                serviceTypePath = ROUTER_PATH.opZones_ZoneBackupAmPmEdition(this.zoneDetail.id);
                break;
            case EDeliveryServiceType.scheduled:
                serviceTypePath = ROUTER_PATH.opZones_ZoneBackupScheduledEdition(this.zoneDetail.id);
                break;
        }
        this._router.navigate([serviceTypePath]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
