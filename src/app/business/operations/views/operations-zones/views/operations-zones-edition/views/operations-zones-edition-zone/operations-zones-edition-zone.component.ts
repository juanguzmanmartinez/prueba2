import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { OperationsZonesEditionStoreService, TZoneDetail } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { ZonesDrugstore } from '../../../../models/operations-zones-store.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { EZoneLabel } from '../../../../models/operations-zones-label.model';
import { IZoneDetailUpdate } from '@interfaces/zones/zones.interface';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { RouterHelperService } from '@helpers/router-helper.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operations-zones-edition-zone',
  templateUrl: './operations-zones-edition-zone.component.html',
  styleUrls: ['./operations-zones-edition-zone.component.sass']
})
export class OperationsZonesEditionZoneComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  public zoneDetail: ZoneDetail;
  public storeList: ZonesDrugstore[];
  public channelList: EChannel[];
  public companyList: ECompany[];
  public labelList: EZoneLabel[] = [];

  public errorResponse: HttpErrorResponse;
  public homeEditionZoneLoader = true;
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
          this.homeEditionZoneLoader = false;
          this.errorResponse = zoneDetail;
        }
      });
    this.subscriptions.add(subscription);
  }

  putZoneDetail(zoneDetailUpdate: IZoneDetailUpdate): void {
    this._operationsZonesImplement.putZoneDetail(
      this.zoneDetail.id, zoneDetailUpdate)
      .subscribe(() => {
        this._operationsZonesEditionStore.updateZoneDetail = true;
        this._alert.alertLightSuccess(OperationMessages.successOperationEdition(this.zoneDetail.name));
        this._routerHelper.backRoute();
      }, () => {
        this._alert.alertError(OperationMessages.errorOperationEdition(this.zoneDetail.name));
        this._routerHelper.backRoute();
      });
  }

  settingData(): void {
    const storeList$ = this._operationsZonesImplement.storeList;
    const channelList$ = this._operationsZonesImplement.channelList;
    const labelList$ = this._operationsZonesImplement.labelList;
    const companyList$ = this._operationsZonesImplement.companyList;

    const subscription = forkJoin([storeList$, channelList$, labelList$, companyList$])
      .subscribe(([storeList, channelList, labelList, companyList]) => {
        this.storeList = storeList;
        this.channelList = channelList;
        this.companyList = companyList;
        this.labelList = labelList;
      }, (error) => {
        this.errorResponse = error;
      }, () => {
        this.homeEditionZoneLoader = false;
      });

    this.subscriptions.add(subscription);
  }

  cancelEdition(): void {
    this._routerHelper.backRoute();
  }

  saveEdition(zoneDetailUpdate: IZoneDetailUpdate): void {
    this.saveEditionLoader = true;
    const subscription = this._dialogTwoActions.openConfirmChanges()
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          this.putZoneDetail(zoneDetailUpdate);
        } else {
          this.saveEditionLoader = false;
        }
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
