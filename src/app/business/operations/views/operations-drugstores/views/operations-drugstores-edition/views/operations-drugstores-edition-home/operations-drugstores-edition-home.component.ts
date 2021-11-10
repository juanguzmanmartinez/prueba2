import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OperationsDrugstoresImplementService } from '../../../../implements/operations-drugstores-implement.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import {
  CDeliveryServiceTypeName,
  CDeliveryServiceTypeRoute,
  EDeliveryServiceType
} from '@models/service-type/delivery-service-type.model';
import { DrugstoreDetail } from '../../../../models/operations-drugstores.model';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsDrugstoresEditionStoreService } from '../../stores/operations-drugstores-edition-store.service';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { OperationMessages } from '../../../../../../parameters/operations-messages.parameter';
import { IDrugstoreServiceTypeRegister } from '@interfaces/drugstores/drugstores.interface';
import { DrugstoreServiceTypeList } from '../../../../models/operations-drugstores-service-type.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OperationsDrugstoresEditionActionsStoreService } from '../../stores/operations-drugstores-edition-actions-store.service';

@Component({
  selector: 'app-operations-drugstores-edition-home',
  templateUrl: './operations-drugstores-edition-home.component.html',
  styleUrls: ['./operations-drugstores-edition-home.component.scss']
})
export class OperationsDrugstoresEditionHomeComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  private serviceTypeName = CDeliveryServiceTypeName;

  public drugstoreDetail: DrugstoreDetail;
  public drugstoreServiceTypeList: DrugstoreServiceTypeList;

  public errorResponse: HttpErrorResponse;
  public homeEditionLoader = true;
  public saveEditionLoader: boolean;
  public updateEditionLoader: boolean;

  get tabSettingsSelectionIndex(): number {
    return this._operationsDrugstoresEditionActionsStore.tabSettingSelection;
  }

  constructor(
    private _router: Router,
    @SkipSelf() private _operationsDrugstoresEditionStore: OperationsDrugstoresEditionStoreService,
    @SkipSelf() private _operationsDrugstoresEditionActionsStore: OperationsDrugstoresEditionActionsStoreService,
    private _dialogTwoActions: DialogTwoActionsService,
    private _operationsDrugstoresImplement: OperationsDrugstoresImplementService,
    private _alert: AlertService,
  ) { }

  ngOnInit(): void {
    this.updateDrugstoreDetail();
    this.getDrugstoreDetail();
  }

  updateDrugstoreDetail(): void {
    const subscription = this._operationsDrugstoresEditionStore.updateDrugstoreDetail$
      .subscribe(() => {
        this.updateEditionLoader = true;
      });
    this.subscriptions.add(subscription);
  }

  getDrugstoreDetail(): void {
    const subscription = this._operationsDrugstoresEditionStore.storeDetail$
      .subscribe((drugstoreDetail: DrugstoreDetail) => {
        if (drugstoreDetail instanceof DrugstoreDetail) {
          this.drugstoreDetail = drugstoreDetail;
          this.drugstoreServiceTypeList = new DrugstoreServiceTypeList(drugstoreDetail.serviceTypeList);
        } else {
          this.drugstoreDetail = null;
          this.drugstoreServiceTypeList = null;
          this.errorResponse = drugstoreDetail;
        }
        this.homeEditionLoader = false;
        this.saveEditionLoader = false;
        this.updateEditionLoader = false;
      });
    this.subscriptions.add(subscription);
  }

  setTabSettingsSelectionIndex(index): void {
    this._operationsDrugstoresEditionActionsStore.tabSettingSelection = index;
  }

  editDrugstore(): void {
    this._router.navigate([ROUTER_PATH.opDrugstores_DrugstoreEdition(this.drugstoreDetail.code)]);
  }

  editServiceType(serviceType: EDeliveryServiceType): void {
    const serviceTypePath = ROUTER_PATH.opDrugstores_DrugstoreServiceTypeEdition(
      this.drugstoreDetail.code,
      CDeliveryServiceTypeRoute[serviceType],
    );
    this._router.navigate([serviceTypePath]);
  }

  addServiceType(serviceType: EDeliveryServiceType): void {
    const subscription = this._dialogTwoActions.openInfo({
        title: `Añadir servicio ${this.serviceTypeName[serviceType]}`,
        description: `¿Deseas añadir ${this.serviceTypeName[serviceType]} al local ${this.drugstoreDetail.name}?`,
        primaryAction: 'Añadir servicio',
        secondaryAction: 'Cancelar'
      }
    )
      .afterClosed()
      .subscribe((confirmChanges) => {
        if (confirmChanges) {
          this.registerServiceType(serviceType);
        }
      });
    this.subscriptions.add(subscription);
  }

  registerServiceType(serviceType: EDeliveryServiceType): void {
    const drugstoreServiceTypRegister = {
      localCode: this.drugstoreDetail.code,
      serviceTypeCode: serviceType,
      startHour: DatesHelper.Date(this.drugstoreDetail.startHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
      endHour: DatesHelper.Date(this.drugstoreDetail.endHour, DATES_FORMAT.millisecond).format(DATES_FORMAT.hourMinuteSecond),
    } as IDrugstoreServiceTypeRegister;

    this._operationsDrugstoresImplement.postDrugstoreServiceType(drugstoreServiceTypRegister)
      .subscribe(() => {
        this.saveEditionLoader = true;
        this._operationsDrugstoresEditionStore.updateDrugstoreDetail = true;
        this._alert.alertSuccess(OperationMessages.successServiceTypeRegistered(this.serviceTypeName[serviceType], this.drugstoreDetail.name));
      }, () => {
        this._alert.alertError(OperationMessages.errorServiceTypeRegistered(this.serviceTypeName[serviceType], this.drugstoreDetail.name));
      });
  }

  editAffiliatedZone(zoneCode: string): void {
    this._router.navigate([ROUTER_PATH.opZones_Zone(zoneCode)]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
