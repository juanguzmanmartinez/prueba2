import { ChangeDetectorRef, Component, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { CCapacityStepGroupOrLocalName, ECapacityStepGroupOrDrugstore, OpCapacitiesStepGroupOrDrugstoreService } from './op-capacities-step-group-or-drugstore.service';
import { Subscription } from 'rxjs';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';

@Component({
    selector: 'app-op-capacities-step-group-or-local',
    templateUrl: './op-capacities-step-group-or-local.component.html',
    styleUrls: ['./op-capacities-step-group-or-local.component.scss'],
    providers: [OpCapacitiesStepGroupOrDrugstoreService]
})
export class OpCapacitiesStepGroupOrLocalComponent implements OnInit, OnDestroy {

    public eCapacityStepStatus = ECapacityStepStatus;
    public groupOrLocalStepStatus: ECapacityStepStatus = ECapacityStepStatus.open;

    public groupOrLocalTabList: ECapacityStepGroupOrDrugstore[] = [ECapacityStepGroupOrDrugstore.group, ECapacityStepGroupOrDrugstore.drugstore];
    public groupOrLocalTabName = CCapacityStepGroupOrLocalName;
    public groupOrLocalTabSelection: ECapacityStepGroupOrDrugstore;
    public groupOrLocalTabReadonly = true;

    public groupOrLocalList: ICustomSelectOption[] = [] as ICustomSelectOption[];
    public groupOrLocalSavedSelection: ICustomSelectOption;
    public groupOrLocalSelection: ICustomSelectOption;
    public groupOrLocalStepDescription: string;

    private subscriptions: Subscription[] = [];

    constructor(
        @Optional() @SkipSelf() private _opCapacitiesStepGroupOrLocal: OpCapacitiesStepGroupOrDrugstoreService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.groupOrLocalTabSelection = this._opCapacitiesStepGroupOrLocal.defaultGroupOrLocalTabSelection;
        this.groupOrLocalSavedSelection = this._opCapacitiesStepGroupOrLocal.defaultGroupOrLocalSelection;
        this.groupOrLocalSelection = this._opCapacitiesStepGroupOrLocal.defaultGroupOrLocalSelection;

        this.updateGroupOrLocalList();
        this.updateEditionModeStepStatus();
        this.changeGroupOrLocalTabSelection(this.groupOrLocalTabSelection);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    openGroupOrLocalStep() {
        this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = this.eCapacityStepStatus.open;
    }

    closeGroupOrLocalStep() {
        if (this.groupOrLocalStepStatus === this.eCapacityStepStatus.open) {
            this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = this.eCapacityStepStatus.close;
        }
        this.groupOrLocalSelection = this.groupOrLocalSavedSelection;
    }

    updateEditionModeStepStatus() {
        const subscription = this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus$
            .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
                if (this.groupOrLocalStepStatus !== eCapacityStepStatus) {
                    this.groupOrLocalStepStatus = eCapacityStepStatus;
                    this._changeDetectorRef.detectChanges();
                }
            });
        this.subscriptions.push(subscription);
    }

    updateGroupOrLocalList() {
        const subscription = this._opCapacitiesStepGroupOrLocal.groupOrLocalList$
            .subscribe((local: ICustomSelectOption[]) => {
                if (local) {
                    this.groupOrLocalList = local;
                    this.groupOrLocalTabReadonly = false;
                    this.updateDefaultGroupOrLocalSelection();
                }
            });
        this.subscriptions.push(subscription);
    }

    updateDefaultGroupOrLocalSelection() {
        if (this.groupOrLocalSelection && this.groupOrLocalList.length) {
            const groupOrLocalSelection = this.groupOrLocalList
                .find((groupOrLocal) => {
                    return groupOrLocal.fulfillmentCenterCode === this.groupOrLocalSelection.fulfillmentCenterCode;
                });
            this.changeGroupOrLocalSelection(groupOrLocalSelection);

            if (this._opCapacitiesStepGroupOrLocal.defaultGroupOrLocalSelectionSaved) {
                this.saveGroupOrLocal();
                this._opCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = this.eCapacityStepStatus.readonly;
            }
        }
    }

    resetGroupOrLocalSelection() {
        // reset
        this.groupOrLocalTabReadonly = false;
        this.groupOrLocalSelection = null;
        this.groupOrLocalSavedSelection = null;
        this.groupOrLocalStepDescription = null;
    }

    saveGroupOrLocal() {
        this.groupOrLocalSavedSelection = this.groupOrLocalSelection;
        this._opCapacitiesStepGroupOrLocal.groupOrLocalSave = this.groupOrLocalSavedSelection;
        if (this.groupOrLocalSavedSelection) {
            this.groupOrLocalStepDescription = this.groupOrLocalSelectionName(this.groupOrLocalSavedSelection);
        }
    }

    cancelGroupOrLocal() {
        this._opCapacitiesStepGroupOrLocal.groupOrLocalCancel = true;
    }

    changeGroupOrLocalTab(event: ECapacityStepGroupOrDrugstore) {
        this.resetGroupOrLocalSelection();
        this.groupOrLocalTabReadonly = true;
        this.groupOrLocalTabSelection = event;
        this.changeGroupOrLocalTabSelection(event);
    }

    changeGroupOrLocalTabSelection(groupOrLocalTabSelected: ECapacityStepGroupOrDrugstore) {
        this._opCapacitiesStepGroupOrLocal.groupOrLocalTab = groupOrLocalTabSelected;
    }

    changeGroupOrLocalSelection(value: ICustomSelectOption) {
        this.groupOrLocalSelection = value;
    }

    groupOrLocalSelectionName(option: ICustomSelectOption) {
        switch (this.groupOrLocalTabSelection) {
            case ECapacityStepGroupOrDrugstore.drugstore:
                return `${option.code} - ${option.text}`;
            case ECapacityStepGroupOrDrugstore.group :
                return `${option.code}`;
        }
    }

}
