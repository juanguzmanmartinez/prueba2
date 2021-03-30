import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Zone, ZoneDetail } from '../../../../models/operations-zones.model';
import { Router } from '@angular/router';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { DialogConfirmChangesService } from '@molecules/dialog/views/dialog-confirmate-changes/dialog-confirm-changes.service';
import { AlertService } from '@molecules/alert/alert.service';
import { Subscription } from 'rxjs';
import { parseUrl } from '@helpers/parse-url.helper';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';

@Component({
    selector: 'app-operations-zones-edition-backup',
    templateUrl: './operations-zones-edition-backup.component.html',
    styleUrls: ['./operations-zones-edition-backup.component.sass']
})
export class OperationsZonesEditionBackupComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    public zoneDetail: ZoneDetail;
    public zoneList: Zone[];

    public backupEditionLoader = true;
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
        this.getZoneDetail();
        this.getZoneList();
    }

    getZoneDetail() {
        const subscription = this._operationsZonesEditionStore.zoneDetail$
            .subscribe((zoneDetail: ZoneDetail) => {
                this.zoneDetail = zoneDetail;
                this.backupEditionLoader = false;
            }, () => {
                this.zoneDetail = null;
                this.backupEditionLoader = false;
            });
        this.subscriptions.push(subscription);
    }

    getZoneList() {
        const subscription = this._operationsZonesImplement.zoneList
            .subscribe((zoneList: Zone[]) => {
                    this.zoneList = zoneList;
                    this.zoneListEditionLoader = false;
                },
                () => {
                    this.zoneList = null;
                    this.zoneListEditionLoader = false;
                });
        this.subscriptions.push(subscription);
    }

    putZoneBackup(zoneBackupUpdate: IZoneBackupUpdate) {
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
                    this.putZoneBackup(zoneBackupUpdate);
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
