import {Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {ECapacityStepGroupOrLocal, OperationsCapacitiesStepGroupOrLocalService} from './operations-capacities-step-group-or-local.service';
import {Subscription} from 'rxjs';
import {ICustomSelectOption} from '../../../../../../commons/interfaces/custom-controls.interface';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';

const CCapacityStepGroupOrLocalName = {
  [ECapacityStepGroupOrLocal.group]: 'Grupo',
  [ECapacityStepGroupOrLocal.local]: 'Local',
};

@Component({
  selector: 'app-operations-capacities-step-group-or-local',
  templateUrl: './operations-capacities-step-group-or-local.component.html',
  styleUrls: ['./operations-capacities-step-group-or-local.component.scss'],
  providers: [OperationsCapacitiesStepGroupOrLocalService]
})
export class OperationsCapacitiesStepGroupOrLocalComponent implements OnInit, OnDestroy {

  public eCapacityStepStatus = ECapacityStepStatus;
  public groupOrLocalStepStatus: ECapacityStepStatus = ECapacityStepStatus.open;

  public groupOrLocalTabList: ECapacityStepGroupOrLocal[] = [ECapacityStepGroupOrLocal.group, ECapacityStepGroupOrLocal.local];
  public groupOrLocalTabName = CCapacityStepGroupOrLocalName;
  public groupOrLocalTabSelection: ECapacityStepGroupOrLocal = ECapacityStepGroupOrLocal.group;
  public groupOrLocalTabReadonly = true;

  public groupOrLocalList: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public groupOrLocalSelection: ICustomSelectOption;
  public groupOrLocalStepDescription: string;

  private subscriptions: Subscription[] = [];

  constructor(
    @Optional() @SkipSelf() private _operationsCapacitiesStepGroupOrLocal: OperationsCapacitiesStepGroupOrLocalService
  ) {
  }

  ngOnInit(): void {
    this.updateGroupOrLocalList();
    this.updateEditionModeStepStatus();
    this.changeGroupOrLocalTabSelection(this.groupOrLocalTabSelection);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openGroupOrLocalStep() {
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = this.eCapacityStepStatus.open;
  }

  closeGroupOrLocalStep() {
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus = this.eCapacityStepStatus.close;
  }

  updateEditionModeStepStatus() {
    const subscription = this._operationsCapacitiesStepGroupOrLocal.groupOrLocalStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.groupOrLocalStepStatus !== eCapacityStepStatus) {
          this.groupOrLocalStepStatus = eCapacityStepStatus;
        }
      });
    this.subscriptions.push(subscription);
  }

  updateGroupOrLocalList() {
    const subscription = this._operationsCapacitiesStepGroupOrLocal.groupOrLocalList$
      .subscribe((local: ICustomSelectOption[]) => {
        if (local) {
          this.groupOrLocalList = local;
          this.resetGroupOrLocalSelection();
        }
      });
    this.subscriptions.push(subscription);
  }

  resetGroupOrLocalSelection() {
    // reset
    this.groupOrLocalTabReadonly = false;
    this.groupOrLocalSelection = null;
    this.groupOrLocalStepDescription = null;
  }

  saveGroupOrLocal() {
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalSave = this.groupOrLocalSelection;
  }

  cancelGroupOrLocal() {
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalCancel = true;
  }

  changeGroupOrLocalTab(event) {
    this.resetGroupOrLocalSelection();

    this.groupOrLocalTabReadonly = true;
    this.groupOrLocalTabSelection = event.target.value;
    this.changeGroupOrLocalTabSelection(event.target.value);
  }

  changeGroupOrLocalTabSelection(groupOrLocalTabSelected: ECapacityStepGroupOrLocal) {
    this._operationsCapacitiesStepGroupOrLocal.groupOrLocalTab = groupOrLocalTabSelected;
  }

  changeGroupOrLocalSelection(value: ICustomSelectOption) {
    this.groupOrLocalSelection = value;
    this.groupOrLocalStepDescription = this.groupOrLocalSelectionName(this.groupOrLocalSelection);
  }

  groupOrLocalSelectionName(option: ICustomSelectOption) {
    switch (this.groupOrLocalTabSelection) {
      case ECapacityStepGroupOrLocal.local:
        return `${option.code} - ${option.text}`;
      case ECapacityStepGroupOrLocal.group :
        return `${option.code}`;
    }
  }

}
