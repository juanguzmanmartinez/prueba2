import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { parseUrl } from '@helpers/parse-url.helper';
import { Subscription } from 'rxjs';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { ZonesStore } from '../../../../models/operations-zones-store.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { EZoneLabel } from '../../../../models/operations-zones-label.model';
import { IZoneDetailUpdate } from '@interfaces/zones/zones.interface';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { EZoneType } from '../../../../models/operations-zones-type.model';

@Component({
    selector: 'app-operations-zones-edition-zone',
    templateUrl: './operations-zones-edition-zone.component.html',
    styleUrls: ['./operations-zones-edition-zone.component.sass']
})
export class OperationsZonesEditionZoneComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    public zoneDetail: ZoneDetail;
    public storeList: ZonesStore[];
    public channelList: EChannel[];
    public companyList: ECompany[] = [];
    public zoneTypeList: EZoneType[] = [];
    public labelList: EZoneLabel[] = [];

    public zoneEditionLoader = true;
    public zoneListEditionLoader = true;
    public saveEditionLoader: boolean;

    constructor(
        private _router: Router,
        @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
        private _operationsZonesImplement: OperationsZonesImplementService,
        private _dialogConfirmChanges: DialogConfirmChangesService,
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        this.getStoreList();
        this.getChannelList();
        this.getZoneDetail();
        this.getCompanyList();
        this.getZoneTypeList();
        this.getLabelList();
    }

    getZoneDetail() {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail: ZoneDetail) => {
                this.zoneDetail = zoneDetail;
                this.zoneEditionLoader = false;
            }, () => {
                this.zoneDetail = null;
                this.zoneEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    putZoneDetail(zoneDetailUpdate: IZoneDetailUpdate) {
        this._operationsZonesImplement.putZoneDetail(
            this.zoneDetail.code, zoneDetailUpdate)
            .subscribe(() => {
                this._operationsZonesEditionStore.updateZoneDetail = true;
                this._alert.alertSuccess(OperationMessages.successOperationEdition(this.zoneDetail.name));
                this.backRoute();
            }, () => {
                this._alert.alertError(OperationMessages.errorOperationEdition(this.zoneDetail.name));
                this.backRoute();
            });
    }

    getStoreList() {
        this._operationsZonesImplement.storeList
            .subscribe((storeList: ZonesStore[]) => {
                this.storeList = storeList;
                this.zoneListEditionLoader = false;
            }, () => {
                this.storeList = null;
                this.zoneListEditionLoader = false;
            });
    }

    getChannelList() {
        this._operationsZonesImplement.channelList
            .subscribe((channelList: EChannel[]) => {
                this.channelList = channelList;
            });
    }

    getCompanyList() {
        this._operationsZonesImplement.companyList
            .subscribe((companyList: ECompany[]) => {
                this.companyList = companyList;
            });
    }

    getZoneTypeList() {
        this._operationsZonesImplement.zoneTypeList
            .subscribe((zoneTypeList: EZoneType[]) => {
                this.zoneTypeList = zoneTypeList;
            });
    }

    getLabelList() {
        this._operationsZonesImplement.labelList
            .subscribe((zoneLabelList: EZoneLabel[]) => {
                this.labelList = zoneLabelList;
            });
    }

    cancelEdition() {
        this.backRoute();
    }

    saveEdition(zoneDetailUpdate: IZoneDetailUpdate) {
        this.saveEditionLoader = true;
        const subscription = this._dialogConfirmChanges.open()
            .afterClosed()
            .subscribe((confirmChanges) => {
                if (confirmChanges) {
                    this.putZoneDetail(zoneDetailUpdate);
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
