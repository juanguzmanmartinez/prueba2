import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Zone, ZoneDetail } from '../../../../models/operations-zones.model';
import { Router } from '@angular/router';
import { OperationsZonesEditionStoreService, TZoneDetail } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { AlertService } from '@molecules/alert/alert.service';
import { forkJoin, Subscription } from 'rxjs';
import { IZoneBackupUpdate } from '@interfaces/zones/zones.interface';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { RouterHelperService } from '@helpers/router-helper.service';
import { EZoneType } from '../../../../parameters/operations-zones-type.parameter';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operations-zones-edition-backup',
  templateUrl: './operations-zones-edition-backup.component.html',
  styleUrls: ['./operations-zones-edition-backup.component.sass']
})
export class OperationsZonesEditionBackupComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  public zoneDetail: ZoneDetail;
  public zoneListStored: Zone[];
  public zoneList: Zone[];
  public zoneTypeList: EZoneType[];

  public errorResponse: HttpErrorResponse;
  public editionBackupLoader = true;
  public saveEditionLoader: boolean;

  constructor(
    private _router: Router,
    @SkipSelf() private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
    private _operationsZonesImplement: OperationsZonesImplementService,
    private _dialogTwoActions: DialogTwoActionsService,
    private _alert: AlertService,
    private _routerHelper: RouterHelperService,
  ) { }

  ngOnInit(): void {
    this.getZoneDetail();
  }

  getZoneDetail(): void {
    const subscription = this._operationsZonesEditionStore.zoneDetail$
      .subscribe((zoneDetail: TZoneDetail) => {
        if (zoneDetail instanceof ZoneDetail) {
          this.zoneDetail = zoneDetail;
          this.settingData();
        } else {
          this.zoneDetail = null;
          this.errorResponse = zoneDetail;
          this.editionBackupLoader = false;
        }
      });
    this.subscriptions.add(subscription);
  }

  putZoneBackup(zoneBackupUpdate: IZoneBackupUpdate): void {
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

  settingData(): void {
    const zoneTypeList$ = this._operationsZonesImplement.zoneTypeList;
    const zoneList$ = this._operationsZonesImplement.zoneList;
    const subscription = forkJoin([zoneTypeList$, zoneList$])
      .subscribe(([zoneTypeList, zoneList]) => {
        this.zoneTypeList = zoneTypeList;
        this.zoneListStored = zoneList;
        this.setZoneList();
      }, (error) => {
        this.errorResponse = error;
        this.zoneTypeList = null;
        this.zoneListStored = null;
        this.zoneList = null;
      }, () => {
        this.editionBackupLoader = false;
      });

    this.subscriptions.add(subscription);
  }

  setZoneList(): void {
    if (this.zoneListStored && this.zoneDetail) {
      this.zoneList = this.zoneListStored
        .filter((zone: Zone) => zone.code !== this.zoneDetail.code);
    }
  }

  cancelEdition(): void {
    this.backRoute();
  }

  saveEdition(zoneBackupUpdate: IZoneBackupUpdate): void {
    this.saveEditionLoader = true;
    const subscription = this._dialogTwoActions.openConfirmChanges()
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          this.putZoneBackup(zoneBackupUpdate);
        } else {
          this.saveEditionLoader = false;
        }
      });
    this.subscriptions.add(subscription);
  }

  backRoute(): void {
    this._routerHelper.backRoute();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
