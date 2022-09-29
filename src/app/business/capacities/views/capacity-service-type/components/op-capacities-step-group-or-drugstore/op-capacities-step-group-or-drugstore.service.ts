import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';

export enum ECapacityStepGroupOrDrugstore {
  group = 'GROUP',
  drugstore = 'LOCAL'
}

export const CCapacityStepGroupOrDrugstoreName = {
  [ECapacityStepGroupOrDrugstore.group]: 'Grupo',
  [ECapacityStepGroupOrDrugstore.drugstore]: 'Local',
};

@Injectable()
export class OpCapacitiesStepGroupOrDrugstoreService {

  public defaultGroupOrDrugstoreTabSelection: ECapacityStepGroupOrDrugstore = ECapacityStepGroupOrDrugstore.group;
  public defaultGroupOrDrugstoreSelection: ICustomSelectOption;
  public defaultGroupOrDrugstoreSelectionSaved: boolean;

  private groupOrDrugstoreListSubject = new BehaviorSubject<ICustomSelectOption[]>(null);
  private groupOrDrugstoreCancelSubject = new BehaviorSubject<boolean>(null);
  private groupOrDrugstoreSaveSubject = new BehaviorSubject<ICustomSelectOption>(null);
  private groupOrDrugstoreStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private getGroupOrDrugstoreTabSubject = new BehaviorSubject<ECapacityStepGroupOrDrugstore>(null);

  get groupOrDrugstoreStepStatus$(): Observable<ECapacityStepStatus> {
    return this.groupOrDrugstoreStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set groupOrDrugstoreStepStatus(groupOrDrugstoreDisabled: ECapacityStepStatus) {
    this.groupOrDrugstoreStepStatusSubject.next(groupOrDrugstoreDisabled);
  }

  get groupOrDrugstoreTab$(): Observable<ECapacityStepGroupOrDrugstore> {
    return this.getGroupOrDrugstoreTabSubject.asObservable();
  }

  set groupOrDrugstoreTab(groupList: ECapacityStepGroupOrDrugstore) {
    this.getGroupOrDrugstoreTabSubject.next(groupList);
  }

  get groupOrDrugstoreList$(): Observable<ICustomSelectOption[]> {
    return this.groupOrDrugstoreListSubject.asObservable();
  }

  set groupOrDrugstoreList(groupOrDrugstoreList: ICustomSelectOption[]) {
    this.groupOrDrugstoreListSubject.next(groupOrDrugstoreList);
  }

  get groupOrDrugstoreCancel$(): Observable<boolean> {
    return this.groupOrDrugstoreCancelSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set groupOrDrugstoreCancel(groupOrDrugstoreCancel: boolean) {
    this.groupOrDrugstoreCancelSubject.next(groupOrDrugstoreCancel);
  }

  get groupOrDrugstoreSave$(): Observable<ICustomSelectOption> {
    return this.groupOrDrugstoreSaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set groupOrDrugstoreSave(groupOrDrugstoreSelected: ICustomSelectOption) {
    this.groupOrDrugstoreSaveSubject.next(groupOrDrugstoreSelected);
  }

  constructor() { }

}
