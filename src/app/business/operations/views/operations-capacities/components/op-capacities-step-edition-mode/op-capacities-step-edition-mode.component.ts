import {ChangeDetectorRef, Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {ECapacitiesStepEditionMode, OpCapacitiesStepEditionModeService} from './op-capacities-step-edition-mode.service';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';
import {Subscription} from 'rxjs';

const CCapacitiesStepEditionModeName = {
  [ECapacitiesStepEditionMode.calendar]: 'Calendario',
  [ECapacitiesStepEditionMode.default]: 'Por defecto',
};

@Component({
  selector: 'app-op-capacities-step-edition-mode',
  templateUrl: './op-capacities-step-edition-mode.component.html',
  styleUrls: ['./op-capacities-step-edition-mode.component.scss'],
  providers: [OpCapacitiesStepEditionModeService]
})
export class OpCapacitiesStepEditionModeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  eCapacityStepStatus = ECapacityStepStatus;
  editionModeStepStatus: ECapacityStepStatus = ECapacityStepStatus.disabled;
  eEditionMode = ECapacitiesStepEditionMode;
  eEditionModeName = CCapacitiesStepEditionModeName;
  editionModeSaveSelected: ECapacitiesStepEditionMode;
  editionModeSelection: ECapacitiesStepEditionMode;
  editionModeSaveLoad: boolean;

  constructor(
    @Optional() @SkipSelf() private _opCapacitiesStepEditionMode: OpCapacitiesStepEditionModeService,
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
    const subscription = this._opCapacitiesStepEditionMode.editionModeStepStatus$
      .subscribe((eCapacityStepStatus: ECapacityStepStatus) => {
        if (this.editionModeStepStatus !== eCapacityStepStatus) {
          this.editionModeStepStatus = eCapacityStepStatus;

          if (this._opCapacitiesStepEditionMode.defaultEditionModeSelectionSaved && eCapacityStepStatus === ECapacityStepStatus.open) {
            this._opCapacitiesStepEditionMode.defaultEditionModeSelectionSaved = false;
            this.saveEditionMode();
          }

          this._changeDetectorRef.detectChanges();
        }
      });
    this.subscriptions.push(subscription);
  }

  resetEditionModeStep() {
    const subscription = this._opCapacitiesStepEditionMode.editionModeResetStepStatus$
      .subscribe(() => {
        this.editionModeSaveLoad = false;
        this.editionModeSaveSelected = null;
        this.editionModeSelection = this._opCapacitiesStepEditionMode.defaultEditionModeSelection;
      });
    this.subscriptions.push(subscription);
  }

  openEditionModeStep() {
    this._opCapacitiesStepEditionMode.editionModeStepStatus = this.eCapacityStepStatus.open;
  }

  closeEditionModeStep() {
    this.editionModeSaveLoad = false;
    this.editionModeSelection = this.editionModeSaveSelected || ECapacitiesStepEditionMode.calendar;
    this._opCapacitiesStepEditionMode.editionModeStepStatus = this.eCapacityStepStatus.close;
  }

  saveEditionMode() {
    this.editionModeSaveLoad = true;
    this.editionModeSaveSelected = this.editionModeSelection;
    this._opCapacitiesStepEditionMode.editionModeSave = this.editionModeSelection;
  }

  cancelEditionMode() {
    this._opCapacitiesStepEditionMode.editionModeCancel = true;
  }

}
