import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ECapacitiesStepEditionMode, OperationsCapacitiesStepEditionModeService} from './operations-capacities-step-edition-mode.service';
import {ECapacityStepStatus} from '../../models/capacity-step-status.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-operations-capacities-step-edition-mode',
  templateUrl: './operations-capacities-step-edition-mode.component.html',
  styleUrls: ['./operations-capacities-step-edition-mode.component.scss']
})
export class OperationsCapacitiesStepEditionModeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  eCapacityStepStatus = ECapacityStepStatus;
  editionModeStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;
  eEditionMode = ECapacitiesStepEditionMode;
  editionModeSaveSelected: ECapacitiesStepEditionMode;
  editionModeSelected = ECapacitiesStepEditionMode.calendar;
  editionModeSaveLoad: boolean;

  constructor(
    private _operationsCapacitiesStepEditionMode: OperationsCapacitiesStepEditionModeService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.updateEditionModeStepStatus();
    this.resetEditionModeStep();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateEditionModeStepStatus() {
    const subscription = this._operationsCapacitiesStepEditionMode.editionModeStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.editionModeStepStatus !== eCapacityStepStatus) {
          this.editionModeStepStatus = eCapacityStepStatus;
          this._changeDetectorRef.detectChanges();
        }
      });
    this.subscriptions.push(subscription);
  }

  resetEditionModeStep() {
    const subscription = this._operationsCapacitiesStepEditionMode.editionModeResetStepStatus$
      .subscribe(() => {
        this.editionModeSaveLoad = false;
        this.editionModeSaveSelected = null;
        this.editionModeSelected = ECapacitiesStepEditionMode.calendar;
      });
    this.subscriptions.push(subscription);
  }

  openEditionModeStep() {
    this._operationsCapacitiesStepEditionMode.editionModeStepStatus = this.eCapacityStepStatus.open;
  }

  closeEditionModeStep() {
    this.editionModeSaveLoad = false;
    this.editionModeSelected = this.editionModeSaveSelected || ECapacitiesStepEditionMode.calendar;
    this._operationsCapacitiesStepEditionMode.editionModeStepStatus = this.eCapacityStepStatus.close;
  }

  saveEditionMode() {
    this.editionModeSaveLoad = true;
    this.editionModeSaveSelected = this.editionModeSelected;
    this._operationsCapacitiesStepEditionMode.editionModeSave = this.editionModeSelected;
  }

  cancelEditionMode() {
    this._operationsCapacitiesStepEditionMode.editionModeCancel = true;
  }

}
