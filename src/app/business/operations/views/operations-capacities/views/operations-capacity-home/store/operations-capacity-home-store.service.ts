import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '@molecules/alert/alert.service';
import { OperationsCapacitiesImplementService } from '../../../implements/operations-capacities-implement.service';
import { CapacitiesDrugstore, CapacitiesDrugstoreServiceDefaultCapacity } from '../../../models/operations-capacities-responses.model';
import { OpCapacitiesDrugstoreDefaultCapacityService } from '../../../components/op-capacities-drugstore-default-capacity/op-capacities-drugstore-default-capacity.service';
import { ECapacitiesStepEditionMode } from '../../../components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.service';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';


@Injectable()
export class OperationsCapacityHomeStoreService implements OnDestroy {

    private subscriptions: Subscription[] = [];

    private capacitiesDrugstoreSelection: CapacitiesDrugstore;

    constructor(
        private _operationsCapacityImplement: OperationsCapacitiesImplementService,
        private _opCapacitiesDrugstoreDefaultCapacity: OpCapacitiesDrugstoreDefaultCapacityService,
        private _alertService: AlertService,
    ) {
        this.getDrugstoreList();
        this.getDrugstoreSelection();
        this.getDrugstoreServiceTypeSelection();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    getDrugstoreList() {
        this._operationsCapacityImplement.getDrugstoreImplement$()
            .subscribe((capacitiesDrugstoreList: CapacitiesDrugstore[]) => {
                this._opCapacitiesDrugstoreDefaultCapacity.drugstoreList = capacitiesDrugstoreList;
            });
    }

    getDrugstoreSelection() {
        const subscription = this._opCapacitiesDrugstoreDefaultCapacity.drugstoreSelection$
            .subscribe((capacityDrugstoreSelection: CapacitiesDrugstore) => {
                this.capacitiesDrugstoreSelection = capacityDrugstoreSelection;
                this.getDrugstoreAvailableServices(capacityDrugstoreSelection);
            });
        this.subscriptions.push(subscription);
    }


    getDrugstoreAvailableServices(drugstore: CapacitiesDrugstore) {
        this._operationsCapacityImplement.getCalendarDefaultCapacitiesImplement$(drugstore)
            .subscribe((serviceDefaultCapacityList: CapacitiesDrugstoreServiceDefaultCapacity[]) => {
                this._opCapacitiesDrugstoreDefaultCapacity.drugstoreServiceList = serviceDefaultCapacityList;
            });

    }

    getDrugstoreServiceTypeSelection() {
        const subscription = this._opCapacitiesDrugstoreDefaultCapacity.drugstoreServiceTypeSelection$
            .subscribe((drugstoreService: CapacitiesDrugstoreServiceDefaultCapacity) => {
                const drugstoreSelection = {fulfillmentCenterCode: this.capacitiesDrugstoreSelection.drugstoreCode} as ICustomSelectOption;

                this._operationsCapacityImplement.getTypeOperationImplements$(
                    ECapacitiesStepEditionMode.default, drugstoreSelection, drugstoreService.serviceType)
                    .subscribe((capacitiesServiceType) => {
                        this._opCapacitiesDrugstoreDefaultCapacity.drugstoreDefaultCapacityList = capacitiesServiceType;
                    });
            });
        this.subscriptions.push(subscription);
    }

}
