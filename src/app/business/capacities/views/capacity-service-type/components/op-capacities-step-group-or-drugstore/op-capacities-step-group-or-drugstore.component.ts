import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  CCapacityStepGroupOrDrugstoreName,
  ECapacityStepGroupOrDrugstore,
  OpCapacitiesStepGroupOrDrugstoreService,
} from './op-capacities-step-group-or-drugstore.service';
import { Subscription } from 'rxjs';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';

@Component({
  selector: 'app-op-capacities-step-group-or-drugstore',
  templateUrl: './op-capacities-step-group-or-drugstore.component.html',
  styleUrls: ['./op-capacities-step-group-or-drugstore.component.scss'],
})
export class OpCapacitiesStepGroupOrDrugstoreComponent
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription();

  public eCapacityStepStatus = ECapacityStepStatus;
  public groupOrDrugstoreStepStatus: ECapacityStepStatus =
    ECapacityStepStatus.open;

  public groupOrDrugstoreTabList: ECapacityStepGroupOrDrugstore[] = [
    ECapacityStepGroupOrDrugstore.group,
    ECapacityStepGroupOrDrugstore.drugstore,
  ];
  public groupOrDrugstoreTabName = CCapacityStepGroupOrDrugstoreName;
  public groupOrDrugstoreTabSelection: ECapacityStepGroupOrDrugstore;
  public groupOrDrugstoreTabReadonly = true;

  public groupOrDrugstoreList: ICustomSelectOption[] =
    [] as ICustomSelectOption[];
  public groupOrDrugstoreSavedSelection: ICustomSelectOption;
  public groupOrDrugstoreSelection: ICustomSelectOption;
  public groupOrDrugstoreStepDescription: string;

  constructor(
    private _opCapacitiesStepGroupOrDrugstore: OpCapacitiesStepGroupOrDrugstoreService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.groupOrDrugstoreTabSelection =
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreTabSelection;
    this.groupOrDrugstoreSavedSelection =
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection;
    this.groupOrDrugstoreSelection =
      this._opCapacitiesStepGroupOrDrugstore.defaultGroupOrDrugstoreSelection;

    this.updateGroupOrDrugstoreList();
    this.updateEditionModeStepStatus();
    this.changeGroupOrDrugstoreTabSelection(this.groupOrDrugstoreTabSelection);
  }

  openGroupOrDrugstoreStep(): void {
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus =
      this.eCapacityStepStatus.open;
  }

  closeGroupOrDrugstoreStep(): void {
    if (this.groupOrDrugstoreStepStatus === this.eCapacityStepStatus.open) {
      this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus =
        this.eCapacityStepStatus.close;
    }
    this.groupOrDrugstoreSelection = this.groupOrDrugstoreSavedSelection;
  }

  updateEditionModeStepStatus(): void {
    const subscription =
      this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus$.subscribe(
        (eCapacityStepStatus: ECapacityStepStatus) => {
          if (this.groupOrDrugstoreStepStatus !== eCapacityStepStatus) {
            this.groupOrDrugstoreStepStatus = eCapacityStepStatus;
            this._changeDetectorRef.detectChanges();
          }
        }
      );
    this.subscriptions.add(subscription);
  }

  updateGroupOrDrugstoreList(): void {
    const subscription =
      this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreList$.subscribe(
        (drugstoreList: ICustomSelectOption[]) => {
          if (drugstoreList) {
            this.groupOrDrugstoreList = drugstoreList;
            this.groupOrDrugstoreTabReadonly = false;
            this.updateDefaultGroupOrDrugstoreSelection();
          }
        }
      );
    this.subscriptions.add(subscription);
  }

  updateDefaultGroupOrDrugstoreSelection(): void {
    if (this.groupOrDrugstoreSelection && this.groupOrDrugstoreList.length) {
      const groupOrDrugstoreSelection = this.groupOrDrugstoreList.find(
        (groupOrDrugstore) => {
          return (
            groupOrDrugstore.fulfillmentCenterCode ===
            this.groupOrDrugstoreSelection.fulfillmentCenterCode
          );
        }
      );
      this.changeGroupOrDrugstoreSelection(groupOrDrugstoreSelection);

      if (
        this._opCapacitiesStepGroupOrDrugstore
          .defaultGroupOrDrugstoreSelectionSaved
      ) {
        this.saveGroupOrDrugstore();
        this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreStepStatus =
          this.eCapacityStepStatus.readonly;
      }
    }
  }

  resetGroupOrDrugstoreSelection(): void {
    this.groupOrDrugstoreTabReadonly = false;
    this.groupOrDrugstoreSelection = null;
    this.groupOrDrugstoreSavedSelection = null;
    this.groupOrDrugstoreStepDescription = null;
  }

  saveGroupOrDrugstore(): void {
    this.groupOrDrugstoreSavedSelection = this.groupOrDrugstoreSelection;
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreSave =
      this.groupOrDrugstoreSavedSelection;
    if (this.groupOrDrugstoreSavedSelection) {
      this.groupOrDrugstoreStepDescription = this.groupOrDrugstoreSelectionName(
        this.groupOrDrugstoreSavedSelection
      );
    }
  }

  cancelGroupOrDrugstore(): void {
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreCancel = true;
  }

  changeGroupOrDrugstoreTab(event: ECapacityStepGroupOrDrugstore): void {
    this.resetGroupOrDrugstoreSelection();
    this.groupOrDrugstoreTabReadonly = true;
    this.groupOrDrugstoreTabSelection = event;
    this.changeGroupOrDrugstoreTabSelection(event);
  }

  changeGroupOrDrugstoreTabSelection(
    groupOrDrugstoreTabSelected: ECapacityStepGroupOrDrugstore
  ): void {
    this._opCapacitiesStepGroupOrDrugstore.groupOrDrugstoreTab =
      groupOrDrugstoreTabSelected;
  }

  changeGroupOrDrugstoreSelection(value: ICustomSelectOption): void {
    this.groupOrDrugstoreSelection = value;
  }

  groupOrDrugstoreSelectionName(option: ICustomSelectOption): string {
    switch (this.groupOrDrugstoreTabSelection) {
      case ECapacityStepGroupOrDrugstore.drugstore:
        return `${option.code} - ${option.text}`;
      case ECapacityStepGroupOrDrugstore.group:
        return `${option.code}`;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
