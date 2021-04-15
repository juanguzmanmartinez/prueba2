import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { CDeliveryServiceTypeName, CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZoneBackupServiceTypeList, ZoneChannelServiceTypeList } from '../../../../models/operations-zones-service-type.model';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { IZoneServiceTypeRegister } from '@interfaces/zones/zones.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { AlertService } from '@molecules/alert/alert.service';
import { parseUrl } from '@helpers/parse-url.helper';
import { ZonesStoreServiceType } from '../../../../models/operations-zones-store.model';
import { EChannel } from '@models/channel/channel.model';

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
    public zoneBackupDetail: ZoneDetail;
    public zoneBackupServiceTypeList: ZoneBackupServiceTypeList = new ZoneBackupServiceTypeList([]);

    public homeEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
        private _dialogConfirmChanges: DialogConfirmChangesService,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        this.getZoneDetail();
        this.getZoneBackup();
    }

    getZoneDetail() {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail: ZoneDetail) => {
                    this.homeEditionLoader = false;
                    this.saveEditionLoader = false;
                    this.zoneDetail = zoneDetail;
                    this.zoneServiceTypeList = zoneDetail.channelList
                        .map((channel: EChannel) => new ZoneChannelServiceTypeList(
                            zoneDetail.serviceTypeList,
                            zoneDetail.assignedStore?.serviceTypeList || [],
                            channel));
                },
                () => {
                    this.saveEditionLoader = false;
                    this.homeEditionLoader = false;
                    this.zoneDetail = null;
                    this.zoneServiceTypeList = null;
                });
        this.subscriptions.push(subscription);
    }

    getZoneBackup() {
        const subscription = this._operationsZonesEditionStore.zoneBackup$
            .subscribe((zoneBackupDetail: ZoneDetail) => {
                    this.zoneBackupDetail = zoneBackupDetail;
                    this.zoneBackupServiceTypeList = new ZoneBackupServiceTypeList(zoneBackupDetail.serviceTypeList, this.zoneDetail.zoneBackup);
                },
                () => {
                    this.zoneBackupDetail = null;
                    this.zoneBackupServiceTypeList = new ZoneBackupServiceTypeList([]);
                });
        this.subscriptions.push(subscription);
    }

    editZone() {
        this._router.navigate([CONCAT_PATH.opZones_ZoneEdition(this.zoneDetail.code)]);
    }

    editServiceType(serviceType: EDeliveryServiceType) {
        const zoneCodePath = CONCAT_PATH.opZones_ZoneCode(this.zoneDetail.code);
        const serviceTypePath = `${zoneCodePath}/${CDeliveryServiceTypeRoute[serviceType]}`;
        this._router.navigate([serviceTypePath]);
    }

    addServiceType(serviceType: {code: EDeliveryServiceType, channel: EChannel}) {
        const subscription = this._dialogConfirmChanges.open()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.registerServiceType(serviceType);
                }
            });
        this.subscriptions.push(subscription);
    }

    registerServiceType(serviceType: {code: EDeliveryServiceType, channel: EChannel}) {
        const assignedStoreServiceType = this.zoneDetail?.assignedStore.serviceTypeList
            .find((storeServiceType: ZonesStoreServiceType) => storeServiceType.code === serviceType.code);

        if (assignedStoreServiceType) {
            const zoneServiceTypRegister = {
                serviceTypeCode: serviceType.code,
                startHour: DatesHelper.Date(assignedStoreServiceType.startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
                endHour: DatesHelper.Date(assignedStoreServiceType.endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
                segmentGap: '30',
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
        this._router.navigate([CONCAT_PATH.opZones_ZoneBackupEdition(this.zoneDetail.code)]);
    }

    editBackupServiceType(serviceType: EDeliveryServiceType) {
        let serviceTypePath;
        switch (serviceType) {
            case EDeliveryServiceType.amPm:
                serviceTypePath = CONCAT_PATH.opZones_ZoneBackupAmPmEdition(this.zoneDetail.code);
                break;
            case EDeliveryServiceType.scheduled:
                serviceTypePath = CONCAT_PATH.opZones_ZoneBackupScheduledEdition(this.zoneDetail.code);
                break;
        }
        this._router.navigate([serviceTypePath]);
    }

    backRoute() {
        const backRoute = parseUrl(this._router.url, '..');
        this._router.navigate([backRoute]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
