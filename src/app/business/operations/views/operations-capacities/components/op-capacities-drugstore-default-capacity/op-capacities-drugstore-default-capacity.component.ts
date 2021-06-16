import { Component, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { OpCapacitiesDrugstoreDefaultCapacityService } from './op-capacities-drugstore-default-capacity.service';
import { Subscription } from 'rxjs';
import { CapacitiesDrugstore, CapacitiesDrugstoreServiceDefaultCapacity, CapacitiesServiceType } from '../../models/operations-capacities-responses.model';
import { CDeliveryServiceTypeRoute, EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { OpCapacitiesDrugstoreDefaultCapacityDialogService } from '../op-capacities-drugstore-default-capacity-dialog/op-capacities-drugstore-default-capacity-dialog.service';
import { Router } from '@angular/router';
import { ECapacityStepGroupOrDrugstore } from '../op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.service';
import { ECapacitiesStepEditionMode } from '../op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { IOpCapacitiesServiceTypeQueryParams } from '../../models/operations-capacities-service-type-query-params.model';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
    selector: 'app-op-capacities-drugstore-default-capacity',
    templateUrl: './op-capacities-drugstore-default-capacity.component.html',
    styleUrls: ['./op-capacities-drugstore-default-capacity.component.scss'],
    providers: [
        OpCapacitiesDrugstoreDefaultCapacityDialogService
    ]
})
export class OpCapacitiesDrugstoreDefaultCapacityComponent implements OnInit, OnDestroy {

    public capacitiesServiceType = EDeliveryServiceType;
    public capacitiesDrugstoreList: CapacitiesDrugstore[] = [];
    public capacitiesDrugstoreSelection: CapacitiesDrugstore;
    public drugstoreDefaultCapacitySelection: CapacitiesDrugstoreServiceDefaultCapacity;
    public capacitiesServiceTypeSelection: CapacitiesServiceType;
    public capacityDrugstoreServiceAmPm: CapacitiesDrugstoreServiceDefaultCapacity;
    public capacityDrugstoreServiceExpress: CapacitiesDrugstoreServiceDefaultCapacity;
    public capacityDrugstoreServiceScheduled: CapacitiesDrugstoreServiceDefaultCapacity;
    public capacityDrugstoreServiceRet: CapacitiesDrugstoreServiceDefaultCapacity;
    private subscriptions: Subscription[] = [];

    constructor(
        @Optional() @SkipSelf() private _opCapacitiesDrugstoreDefaultCapacity: OpCapacitiesDrugstoreDefaultCapacityService,
        private _opCapacitiesDrugstoreDefaultCapacityDialog: OpCapacitiesDrugstoreDefaultCapacityDialogService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.updateDefaultCapacityDrugstoreList();
        this.updateDefaultCapacityDrugstoreServiceList();
        this.updateDrugstoreCapacitiesServiceType();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    updateDefaultCapacityDrugstoreList() {
        const subscription = this._opCapacitiesDrugstoreDefaultCapacity.drugstoreDefaultCapacityDrugstoreList$
            .subscribe((capacitiesDrugstoreList) => {
                this.capacitiesDrugstoreList = capacitiesDrugstoreList;
                this.changeCapacitiesDrugstoreSelection(capacitiesDrugstoreList[0]);
            });
        this.subscriptions.push(subscription);
    }

    changeCapacitiesDrugstoreSelection(capacitiesDrugstore: CapacitiesDrugstore) {
        this.capacitiesDrugstoreSelection = capacitiesDrugstore;
        this._opCapacitiesDrugstoreDefaultCapacity.drugstoreDefaultCapacityDrugstoreSelection = capacitiesDrugstore;
        this.resetDrugstoreServiceList();
    }

    updateDefaultCapacityDrugstoreServiceList() {
        const subscription = this._opCapacitiesDrugstoreDefaultCapacity.drugstoreDefaultCapacityDrugstoreServiceList$
            .subscribe((drugstoreServiceList: CapacitiesDrugstoreServiceDefaultCapacity[]) => {
                this.resetDrugstoreServiceList();
                drugstoreServiceList.forEach((drugstoreService) => {
                    switch (drugstoreService.serviceType) {
                        case EDeliveryServiceType.amPm:
                            this.capacityDrugstoreServiceAmPm = drugstoreService;
                            break;
                        case EDeliveryServiceType.express:
                            this.capacityDrugstoreServiceExpress = drugstoreService;
                            break;
                        case EDeliveryServiceType.scheduled:
                            this.capacityDrugstoreServiceScheduled = drugstoreService;
                            break;
                        case EDeliveryServiceType.ret:
                            this.capacityDrugstoreServiceRet = drugstoreService;
                            break;
                    }
                });
            });
        this.subscriptions.push(subscription);
    }

    resetDrugstoreServiceList() {
        this.capacityDrugstoreServiceAmPm = null;
        this.capacityDrugstoreServiceExpress = null;
        this.capacityDrugstoreServiceScheduled = null;
        this.capacityDrugstoreServiceRet = null;
    }

    updateDrugstoreCapacitiesServiceType() {
        const subscription = this._opCapacitiesDrugstoreDefaultCapacity.drugstoreDefaultCapacityList$
            .subscribe((capacitiesServiceType: CapacitiesServiceType) => {
                this.capacitiesServiceTypeSelection = capacitiesServiceType;
                this.openServiceDefaultCapacity();
            });
        this.subscriptions.push(subscription);
    }

    openServiceDefaultCapacity() {
        const serviceDefaultCapacityDialogRef = this._opCapacitiesDrugstoreDefaultCapacityDialog
            .openServiceDefaultCapacityDialog(
                this.capacitiesDrugstoreSelection,
                this.drugstoreDefaultCapacitySelection,
                this.capacitiesServiceTypeSelection
            );
        const subscription = serviceDefaultCapacityDialogRef.afterClosed()
            .subscribe((editService) => {
                if (editService) {
                    this.drugstoreDefaultCapacityEditService(this.drugstoreDefaultCapacitySelection);
                }
            });
        this.subscriptions.push(subscription);
    }


    drugstoreDefaultCapacityViewMore(drugstoreService: CapacitiesDrugstoreServiceDefaultCapacity) {
        this.drugstoreDefaultCapacitySelection = drugstoreService;
        this._opCapacitiesDrugstoreDefaultCapacity.drugstoreDefaultCapacityDrugstoreServiceTypeSelection = drugstoreService;
    }

    drugstoreDefaultCapacityEditService(drugstoreService: CapacitiesDrugstoreServiceDefaultCapacity) {
        const drugstoreServiceTypePath = `${ROUTER_PATH.operationCapacities}/${CDeliveryServiceTypeRoute[drugstoreService.serviceType]}`;
        const drugstoreServiceTypeParams = {
            groupOrDrugstore: ECapacityStepGroupOrDrugstore.drugstore,
            drugstoreCode: this.capacitiesDrugstoreSelection.drugstoreCode,
            editionMode: ECapacitiesStepEditionMode.default
        } as IOpCapacitiesServiceTypeQueryParams;
        this._router.navigate([drugstoreServiceTypePath], {queryParams: drugstoreServiceTypeParams});
    }
}
