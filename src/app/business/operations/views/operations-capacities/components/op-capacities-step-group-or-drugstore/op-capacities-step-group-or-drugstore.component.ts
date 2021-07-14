import { ChangeDetectorRef, Component, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { CCapacityStepGroupOrDrugstoreName, ECapacityStepGroupOrDrugstore, OpCapacitiesStepGroupOrDrugstoreService } from './op-capacities-step-group-or-drugstore.service';
import { Subscription } from 'rxjs';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';

@Component({
    selector: 'app-op-capacities-step-group-or-drugstore',
    templateUrl: './op-capacities-step-group-or-drugstore.component.html',
    styleUrls: ['./op-capacities-step-group-or-drugstore.component.scss'],
    providers: [OpCapacitiesStepGroupOrDrugstoreService]
})
export class OpCapacitiesStepGroupOrDrugstoreComponent implements OnInit, OnDestroy {

    public eCapacityStepStatus = ECapacityStepStatus;
    public groupOrDrugstoreStepStatus: ECapacityStepStatus = ECapacityStepStatus.open;

    public groupOrDrugstoreTabList: ECapacityStepGroupOrDrugstore[] = [ECapacityStepGroupOrDrugstore.group, ECapacityStepGroupOrDrugstore.drugstore];
    public groupOrDrugstoreTabName = CCapacityStepGroupOrDrugstoreName;
    public groupOrDrugstoreTabSelection: ECapacityStepGroupOrDrugstore;
    public groupOrDrugstoreTabReadonly = true;

    public groupOrDrugstoreList: ICustomSelectOption[] = [] as ICustomSelectOption[];
    public groupOrDrugstoreSavedSelection: ICustomSelectOption;
    public groupOrDrugstoreSelection: ICustomSelectOption;
    public groupOrDrugstoreStepDescription: string;

    private subscriptions: Subscription[] = [];

    constructor(
        @Optional() @SkipSelf() private _opCapacitiesStepGroupOrDrugstore: OpCapacitiesStepGroupOrDrugstoreService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.groupOrDrugstoreTabSelection = this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreTabSelection;
        this.groupOrDrugstoreSavedSelection = this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection;
        this.groupOrDrugstoreSelection = this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection;

        this.updateGroupOrDrugstoreList();
        this.updateEditionModeStepStatus();
        this.changeGroupOrDrugstoreTabSelection(this.groupOrDrugstoreTabSelection);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    openGroupOrDrugstoreStep() {
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = this.eCapacityStepStatus.open;
    }

    closeGroupOrDrugstoreStep() {
        if (this.groupOrDrugstoreStepStatus === this.eCapacityStepStatus.open) {
            this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = this.eCapacityStepStatus.close;
        }
        this.groupOrDrugstoreSelection = this.groupOrDrugstoreSavedSelection;
    }

    updateEditionModeStepStatus() {
        const subscription = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus$
            .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
                if (this.groupOrDrugstoreStepStatus !== eCapacityStepStatus) {
                    this.groupOrDrugstoreStepStatus = eCapacityStepStatus;
                    this._changeDetectorRef.detectChanges();
                }
            });
        this.subscriptions.push(subscription);
    }

    updateGroupOrDrugstoreList() {
        const subscription = this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreList$
            .subscribe((drugstoreList: ICustomSelectOption[]) => {
                if (drugstoreList) {
                    this.groupOrDrugstoreList = drugstoreList;
                    this.groupOrDrugstoreTabReadonly = false;
                    this.updateDefaultGroupOrDrugstoreSelection();
                }
            });
        this.subscriptions.push(subscription);
    }

    updateDefaultGroupOrDrugstoreSelection() {
        if (this.groupOrDrugstoreSelection && this.groupOrDrugstoreList.length) {
            const groupOrDrugstoreSelection = this.groupOrDrugstoreList
                .find((groupOrDrugstore) => {
                    return groupOrDrugstore.fulfillmentCenterCode === this.groupOrDrugstoreSelection.fulfillmentCenterCode;
                });
            this.changeGroupOrDrugstoreSelection(groupOrDrugstoreSelection);

            if (this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelectionSaved) {
                this.saveGroupOrDrugstore();
                this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus = this.eCapacityStepStatus.readonly;
            }
        }
    }

    resetGroupOrDrugstoreSelection() {
        // reset
        this.groupOrDrugstoreTabReadonly = false;
        this.groupOrDrugstoreSelection = null;
        this.groupOrDrugstoreSavedSelection = null;
        this.groupOrDrugstoreStepDescription = null;
    }

    saveGroupOrDrugstore() {
        this.groupOrDrugstoreSavedSelection = this.groupOrDrugstoreSelection;
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreSave = this.groupOrDrugstoreSavedSelection;
        if (this.groupOrDrugstoreSavedSelection) {
            this.groupOrDrugstoreStepDescription = this.groupOrDrugstoreSelectionName(this.groupOrDrugstoreSavedSelection);
        }
    }

    cancelGroupOrDrugstore() {
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreCancel = true;
    }

    changeGroupOrDrugstoreTab(event: ECapacityStepGroupOrDrugstore) {
        this.resetGroupOrDrugstoreSelection();
        this.groupOrDrugstoreTabReadonly = true;
        this.groupOrDrugstoreTabSelection = event;
        this.changeGroupOrDrugstoreTabSelection(event);
    }

    changeGroupOrDrugstoreTabSelection(groupOrDrugstoreTabSelected: ECapacityStepGroupOrDrugstore) {
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreTab = groupOrDrugstoreTabSelected;
    }

    changeGroupOrDrugstoreSelection(value: ICustomSelectOption) {
        this.groupOrDrugstoreSelection = value;
    }

    groupOrDrugstoreSelectionName(option: ICustomSelectOption) {
        switch (this.groupOrDrugstoreTabSelection) {
            case ECapacityStepGroupOrDrugstore.drugstore:
                return `${option.code} - ${option.text}`;
            case ECapacityStepGroupOrDrugstore.group :
                return `${option.code}`;
        }
    }

}
