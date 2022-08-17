import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import {
  CDeliveryServiceTypeName,
  CDeliveryServiceTypeRoute,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';
import {
  ZoneBackupServiceTypeList,
  ZoneChannelServiceTypeList,
  ZoneCompanyServiceTypeList,
  ZonesChannelServiceTypeRegistered,
  ZoneServiceType,
  ZoneServiceTypeRegistered,
} from '../../../../models/operations-zones-service-type.model';
import {
  OperationsZonesEditionStoreService,
  TZoneBackup,
  TZoneDetail,
} from '../../stores/operations-zones-edition-store.service';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { IZoneServiceTypeRegister } from '@interfaces/zones/zones.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { AlertService } from '@molecules/alert/alert.service';
import {
  ZonesDrugstore,
  ZonesDrugstoreServiceType,
} from '../../../../models/operations-zones-store.model';
import { CChannelRoute, EChannel } from '@models/channel/channel.model';
import {
  CZoneServiceTypeSegmentGap,
  ZoneServiceTypeBasicRequest,
} from '../../../../parameters/operations-zones-service-type.parameter';
import { OperationsZonesEditionActionsStoreService } from '../../stores/operations-zones-edition-actions-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CCompanyRoute, ECompany } from '@models/company/company.model';

@Component({
  selector: 'app-operations-zones-edition-home',
  templateUrl: './operations-zones-edition-home.component.html',
  styleUrls: ['./operations-zones-edition-home.component.sass'],
})
export class OperationsZonesEditionHomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  private serviceTypeName = CDeliveryServiceTypeName;

  public zoneDetail: ZoneDetail;
  public zoneServiceTypeList: ZoneChannelServiceTypeList[];
  public zoneCompanyServiceTypeList: ZoneCompanyServiceTypeList[];
  public zoneDetailError: HttpErrorResponse;

  public zoneBackupDetail: ZoneDetail;
  public zoneBackupServiceTypeList: ZoneBackupServiceTypeList =
    new ZoneBackupServiceTypeList([]);
  public zoneBackupDetailError: HttpErrorResponse;

  public errorResponse: HttpErrorResponse;
  public homeEditionLoader = true;
  public saveEditionLoader: boolean;
  public updateEditionLoader: boolean;
  public listCompany: ECompany[];
  public listChannel: EChannel[];
  public zonesDrugstoreServiceType: ZonesDrugstoreServiceType[];
  public zonesServiceTypeRegistered: ZoneServiceTypeRegistered[];
  public zonesChannelServiceTypeRegistered: ZonesChannelServiceTypeRegistered[];

  public serviceTypeList: ZoneServiceType[];

  get tabSettingsSelectionIndex(): number {
    return this._operationsZonesEditionActionsStore.tabSettingSelection;
  }

  constructor(
    private _router: Router,
    @SkipSelf()
    private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
    @SkipSelf()
    private _operationsZonesEditionActionsStore: OperationsZonesEditionActionsStoreService,
    private _dialogTwoActions: DialogTwoActionsService,
    private _operationsZonesImplement: OperationsZonesImplementService,
    private _alert: AlertService
  ) {
    this.zonesServiceTypeRegistered = [];
    this.zonesChannelServiceTypeRegistered = [];
  }

  ngOnInit(): void {
    this.updateZoneDetail();
    this.getZoneDetail();
    this.getZoneBackup();
  }

  updateZoneDetail(): void {
    const subscription =
      this._operationsZonesEditionStore.updateZoneDetail$.subscribe(() => {
        this.updateEditionLoader = true;
      });
    this.subscriptions.add(subscription);
  }

  getZoneDetail(): void {
    const subscription =
      this._operationsZonesEditionStore.zoneDetail$.subscribe(
        (zoneDetail: TZoneDetail) => {
          if (zoneDetail instanceof ZoneDetail) {
            this.zonesServiceTypeRegistered = [];
            this.zonesChannelServiceTypeRegistered = [];
            this.zoneDetail = zoneDetail;
            this.serviceTypeList = zoneDetail.serviceTypeList;

            this.zonesDrugstoreServiceType =
              zoneDetail.assignedStore?.serviceTypeList || [];
            this.zoneServiceTypeList = zoneDetail.channelList.map(
              (channel: EChannel) =>
                new ZoneChannelServiceTypeList(
                  zoneDetail.serviceTypeList,
                  zoneDetail.assignedStore?.serviceTypeList || [],
                  channel,
                  zoneDetail.companyList
                )
            );
            this.zoneCompanyServiceTypeList = zoneDetail.companyList.map(
              (company: ECompany) =>
                new ZoneCompanyServiceTypeList(zoneDetail.companyList, company)
            );
            this.mapServiceRegistered();
          } else {
            this.listCompany = [];
            this.zoneDetail = null;
            this.zoneServiceTypeList = null;
            this.zoneDetailError = zoneDetail;
            this.zonesServiceTypeRegistered = [];
            this.zonesChannelServiceTypeRegistered = [];
          }
        }
      );
    this.subscriptions.add(subscription);
  }

  // mapServiceRegistered() {
  //   this.zoneDetail.companyList.forEach((company) => {
  //     Object.keys(CDeliveryServiceTypeName).forEach((value) => {
  //       if (value !== CDeliveryServiceTypeName.RAD) {
  //         // this.zonesServiceTypeRegistered.push(
  //         //   this.getServiceRegistered(value as EDeliveryServiceType, company)
  //         // );
  //         this.getServiceRegistered(value as EDeliveryServiceType, company);
  //       }
  //     });
  //   });
  // }
  mapServiceRegistered() {
    this.zoneDetail.channelList.forEach((channel) => {
      this.zonesServiceTypeRegistered = [];
      this.zoneDetail.companyList.forEach((company) => {
        Object.keys(CDeliveryServiceTypeName).forEach((value) => {
          if (value !== CDeliveryServiceTypeName.RAD) {
            this.getServiceRegistered(
              value as EDeliveryServiceType,
              channel,
              company
            );
          }
        });
      });
      this.zonesChannelServiceTypeRegistered.push(
        new ZonesChannelServiceTypeRegistered(
          channel,
          this.zonesServiceTypeRegistered
        )
      );
    });
  }

  getServiceRegistered(
    serviceTypeCode: EDeliveryServiceType,
    channel: EChannel,
    company: ECompany
  ) {
    const zones: ZoneServiceType[] = this.serviceTypeList.filter(
      (serviceType) =>
        serviceType.code === serviceTypeCode && serviceType.channel === channel
    );
    const zoneStore: ZonesDrugstoreServiceType =
      this.zonesDrugstoreServiceType.find(
        (serviceType) => serviceType.code === serviceTypeCode
      );

    if (zones) {
      zones.forEach((zone) => {
        this.zonesServiceTypeRegistered.push(
          new ZoneServiceTypeRegistered(
            zone,
            zoneStore,
            serviceTypeCode,
            channel,
            company
          )
        );
      });
    }
    if (!zones || zones.length === 0) {
      this.zonesServiceTypeRegistered.push(
        new ZoneServiceTypeRegistered(
          null,
          zoneStore,
          serviceTypeCode,
          channel,
          company
        )
      );
    }

    // return new ZoneServiceTypeRegistered(
    //   zone,
    //   zoneStore,
    //   serviceTypeCode,
    //   channel,
    //   company
    // );
  }

  getZoneBackup(): void {
    const subscription =
      this._operationsZonesEditionStore.zoneBackup$.subscribe(
        (zoneBackupDetail: TZoneBackup) => {
          if (zoneBackupDetail instanceof ZoneDetail) {
            this.zoneBackupDetail = zoneBackupDetail;
            this.zoneBackupServiceTypeList = new ZoneBackupServiceTypeList(
              zoneBackupDetail.serviceTypeList,
              this.zoneDetail.zoneBackup
            );
          } else {
            this.zoneBackupDetail = null;
            this.zoneBackupServiceTypeList = new ZoneBackupServiceTypeList([]);
            if (zoneBackupDetail instanceof HttpErrorResponse) {
              this.zoneBackupDetailError = zoneBackupDetail;
            }
          }

          this.settingData();
        }
      );
    this.subscriptions.add(subscription);
  }

  settingData(): void {
    this.errorResponse = this.zoneDetailError || this.zoneBackupDetailError;
    this.homeEditionLoader = false;
    this.saveEditionLoader = false;
    this.updateEditionLoader = false;
  }

  setTabSettingsSelectionIndex(index): void {
    this._operationsZonesEditionActionsStore.tabSettingSelection = index;
  }

  editZone(): void {
    this._router.navigate([
      ROUTER_PATH.opZones_ZoneEdition(this.zoneDetail.id),
    ]);
  }

  editServiceType(serviceType: ZoneServiceTypeBasicRequest): void {
    const serviceTypePath = ROUTER_PATH.opZones_ZoneServiceTypeEdition(
      CDeliveryServiceTypeRoute[serviceType.code],
      this.zoneDetail.id,
      CChannelRoute[serviceType.channel],
      CCompanyRoute[serviceType.company]
    );
    this._router.navigate([serviceTypePath]);
  }

  addServiceType(serviceType: ZoneServiceTypeBasicRequest): void {
    const subscription = this._dialogTwoActions
      .openInfo({
        title: `Añadir servicio ${this.serviceTypeName[serviceType.code]}`,
        description: `¿Deseas añadir ${
          this.serviceTypeName[serviceType.code]
        } a la zona ${this.zoneDetail.name}?`,
        primaryAction: 'Añadir servicio',
        secondaryAction: 'Cancelar',
      })
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          this.registerServiceType(serviceType);
        }
      });
    this.subscriptions.add(subscription);
  }

  registerServiceType(serviceType: ZoneServiceTypeBasicRequest): void {
    const assignedStoreServiceType =
      this.zoneDetail?.assignedStore.serviceTypeList.find(
        (storeServiceType: ZonesDrugstoreServiceType) =>
          storeServiceType.code === serviceType.code
      );

    if (assignedStoreServiceType) {
      const zoneServiceTypRegister = {
        serviceTypeCode: serviceType.code,
        startHour: DatesHelper.Date(
          assignedStoreServiceType.startHour,
          DATES_FORMAT.millisecond
        ).format(DATES_FORMAT.hourMinuteSecond),
        endHour: DatesHelper.Date(
          assignedStoreServiceType.endHour,
          DATES_FORMAT.millisecond
        ).format(DATES_FORMAT.hourMinuteSecond),
        segmentGap: CZoneServiceTypeSegmentGap[serviceType.code].toString(),
        zoneId: this.zoneDetail.id,
        channel: serviceType.channel,
        companyCode: serviceType.company,
        serviceTypeId: serviceType.serviceTypeId
      } as IZoneServiceTypeRegister;
      this._operationsZonesImplement
        .postZoneServiceType(zoneServiceTypRegister)
        .subscribe(
          () => {
            this.saveEditionLoader = true;
            this._operationsZonesEditionStore.updateZoneDetail = true;
            this._alert.alertSuccess(
              OperationMessages.successServiceTypeRegistered(
                this.serviceTypeName[serviceType.code],
                this.zoneDetail.name
              )
            );
          },
          () => {
            this._alert.alertError(
              OperationMessages.errorServiceTypeRegistered(
                this.serviceTypeName[serviceType.code],
                this.zoneDetail.name
              )
            );
          }
        );
    } else {
      this._alert.alertError(
        OperationMessages.errorServiceTypeRegistered(
          this.serviceTypeName[serviceType.code],
          this.zoneDetail.name
        )
      );
    }
  }

  editBackupZone(): void {
    this._router.navigate([
      ROUTER_PATH.opZones_ZoneBackupEdition(this.zoneDetail.id),
    ]);
  }

  editBackupServiceType(serviceType: EDeliveryServiceType): void {
    let serviceTypePath;
    switch (serviceType) {
      case EDeliveryServiceType.amPm:
        serviceTypePath = ROUTER_PATH.opZones_ZoneBackupAmPmEdition(
          this.zoneDetail.id
        );
        break;
      case EDeliveryServiceType.scheduled:
        serviceTypePath = ROUTER_PATH.opZones_ZoneBackupScheduledEdition(
          this.zoneDetail.id
        );
        break;
    }
    this._router.navigate([serviceTypePath]);
  }

  ngOnDestroy(): void {
    this.zonesServiceTypeRegistered = [];
    this.subscriptions.unsubscribe();
  }
}
