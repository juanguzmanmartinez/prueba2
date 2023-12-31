import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { Subscription } from 'rxjs';
import { OperationsZonesEditionStoreService } from '../../stores/operations-zones-edition-store.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import {
  CDeliveryServiceTypeName,
  CDeliveryServiceTypeRoute,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';
import { IZoneServiceTypeUpdate } from '@interfaces/zones/zones.interface';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { AlertService } from '@molecules/alert/alert.service';
import { ZonesDrugstoreServiceType } from '../../../../models/operations-zones-store.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ZoneServiceType } from '../../../../models/operations-zones-service-type.model';
import {
  CChannelName,
  CChannelRoute,
  EChannel,
} from '@models/channel/channel.model';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OP_ZONES_PATH } from '@parameters/router/routing/operations/operations-router.parameter';
import { CCompanyRoute, ECompany } from '@models/company/company.model';

@Component({
  selector: 'app-operations-zones-edition-service-type',
  templateUrl: './operations-zones-edition-service-type.component.html',
  styleUrls: ['./operations-zones-edition-service-type.component.sass'],
})
export class OperationsZonesEditionServiceTypeComponent
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription();

  public zoneDetail: ZoneDetail;
  public serviceType: EDeliveryServiceType;
  public channel: EChannel;
  public company: ECompany;
  public zoneServiceType: ZoneServiceType;
  public zonesStoreServiceType: ZonesDrugstoreServiceType;
  public serviceTypeName = CDeliveryServiceTypeName;
  public channelName = CChannelName;

  public errorResponse: HttpErrorResponse;
  public editionServiceTypeLoader = true;
  public saveEditionLoader: boolean;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    @SkipSelf()
    private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
    private _operationsZonesImplement: OperationsZonesImplementService,
    private _dialogTwoActions: DialogTwoActionsService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    const serviceTypeCode =
      this._activatedRoute.snapshot.params[
        OP_ZONES_PATH.zoneServiceTypeEdition
      ];
    const serviceTypeChannel =
      this._activatedRoute.snapshot.params[
        OP_ZONES_PATH.zoneServiceTypeChannelEdition
      ];
    const serviceTypeCompany =
      this._activatedRoute.snapshot.params[
        OP_ZONES_PATH.zoneServiceTypeCompanyEdition
      ];
    this.serviceType = Object.keys(CDeliveryServiceTypeRoute).find(
      (key) => CDeliveryServiceTypeRoute[key] === serviceTypeCode
    ) as EDeliveryServiceType;
    this.channel = Object.keys(CChannelRoute).find(
      (key) => CChannelRoute[key] === serviceTypeChannel
    ) as EChannel;
    this.company = Object.keys(CCompanyRoute).find(
      (key) => CCompanyRoute[key] === serviceTypeCompany
    ) as ECompany;

    this.getZoneDetail();
    this.setZoneServiceType();
  }

  getZoneDetail(): void {
    const subscription =
      this._operationsZonesEditionStore.zoneDetail$.subscribe(
        (zoneDetail: ZoneDetail) => {
          if (zoneDetail instanceof ZoneDetail) {
            this.zoneDetail = zoneDetail;
            this.setZoneServiceType();
          } else {
            this.zoneDetail = null;
            this.editionServiceTypeLoader = false;
            this.errorResponse = zoneDetail;
          }
        }
      );
    this.subscriptions.add(subscription);
  }
  routeback() {
    console.log('hoad');
  }

  private setZoneServiceType(): void {
    this.zoneServiceType = this.zoneDetail?.serviceTypeList.find(
      (serviceType: ZoneServiceType) =>
        serviceType.code === this.serviceType &&
        serviceType.channel === this.channel &&
        serviceType.companyCode === this.company
    );
    this.zonesStoreServiceType =
      this.zoneDetail?.assignedStore.serviceTypeList.find(
        (serviceType: ZonesDrugstoreServiceType) =>
          serviceType.code === this.serviceType
      );
    this.editionServiceTypeLoader = !this.zoneDetail;

    if (!this.zoneServiceType && !this.editionServiceTypeLoader) {
      this.errorResponse = new HttpErrorResponse({});
    }
  }

  putServiceType(zoneServiceTypeUpdate: IZoneServiceTypeUpdate): void {
    this._operationsZonesImplement
      .putZoneServiceType(`${this.zoneServiceType.id}`, zoneServiceTypeUpdate)
      .subscribe(
        () => {
          this._operationsZonesEditionStore.updateZoneDetail = true;
          this._alert.alertLightSuccess(
            OperationMessages.successServiceTypeEdition(
              this.serviceTypeName[this.zoneServiceType.code],
              this.zoneDetail.name
            )
          );
          this.backRoute();
        },
        () => {
          this._alert.alertError(
            OperationMessages.errorServiceTypeEdition(
              this.serviceTypeName[this.zoneServiceType.code],
              this.zoneDetail.name
            )
          );
          this.backRoute();
        }
      );
  }

  cancelEdition(): void {
    this.backRoute();
  }

  saveEdition(zoneServiceTypeUpdate: IZoneServiceTypeUpdate): void {
    this.saveEditionLoader = true;
    const subscription = this._dialogTwoActions
      .openConfirmChanges()
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          this.putServiceType(zoneServiceTypeUpdate);
        } else {
          this.saveEditionLoader = false;
        }
      });
    this.subscriptions.add(subscription);
  }

  backRoute(): void {
    const backRoute = ROUTER_PATH.opZones_Zone(this.zoneDetail.id);
    this._router.navigate([backRoute]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
