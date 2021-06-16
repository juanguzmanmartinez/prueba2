import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICustomSelectOption } from '@interfaces/custom-controls.interface';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';

export enum ECapacityStepGroupOrDrugstore {
  group = 'GROUP',
  drugstore = 'LOCAL'
}

export const CCapacityStepGroupOrLocalName = {
  [ECapacityStepGroupOrDrugstore.group]: 'Grupo',
  [ECapacityStepGroupOrDrugstore.drugstore]: 'Local',
};

@Injectable()
export class OpCapacitiesStepGroupOrDrugstoreService {

  private groupOrLocalListSubject = new BehaviorSubject<ICustomSelectOption[]>(null);
  public defaultGroupOrLocalTabSelection: ECapacityStepGroupOrDrugstore = ECapacityStepGroupOrDrugstore.group;
  private groupOrLocalCancelSubject = new BehaviorSubject<boolean>(null);
  private groupOrLocalSaveSubject = new BehaviorSubject<ICustomSelectOption>(null);
  private groupOrLocalStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private getGroupOrLocalTabSubject = new BehaviorSubject<ECapacityStepGroupOrDrugstore>(null);
  public defaultGroupOrLocalSelection: ICustomSelectOption;
  public defaultGroupOrLocalSelectionSaved: boolean;


  constructor() {
  }

  get groupOrLocalStepStatus$(): Observable<ECapacityStepStatus> {
    return this.groupOrLocalStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set groupOrLocalStepStatus(groupOrLocalDisabled: ECapacityStepStatus) {
    this.groupOrLocalStepStatusSubject.next(groupOrLocalDisabled);
  }

  get groupOrLocalTab$(): Observable<ECapacityStepGroupOrDrugstore> {
    return this.getGroupOrLocalTabSubject.asObservable();
  }

  set groupOrLocalTab(groupList: ECapacityStepGroupOrDrugstore) {
    this.getGroupOrLocalTabSubject.next(groupList);
  }

  get groupOrLocalList$(): Observable<ICustomSelectOption[]> {
    return this.groupOrLocalListSubject.asObservable();
  }

  set groupOrLocalList(groupOrLocalList: ICustomSelectOption[]) {
    this.groupOrLocalListSubject.next(groupOrLocalList);
  }

  get groupOrLocalCancel$(): Observable<boolean> {
    return this.groupOrLocalCancelSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set groupOrLocalCancel(groupOrLocalCancel: boolean) {
    this.groupOrLocalCancelSubject.next(groupOrLocalCancel);
  }

  get groupOrLocalSave$(): Observable<ICustomSelectOption> {
    return this.groupOrLocalSaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set groupOrLocalSave(groupOrLocalSelected: ICustomSelectOption) {
    this.groupOrLocalSaveSubject.next(groupOrLocalSelected);
  }

}
