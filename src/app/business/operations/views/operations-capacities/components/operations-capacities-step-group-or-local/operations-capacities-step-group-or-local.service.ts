import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ICustomSelectOption} from '../../../../../../commons/interfaces/custom-controls.interface';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';

export enum ECapacityStepGroupOrLocal {
  group = 'GROUP',
  local = 'LOCAL'
}


@Injectable()
export class OperationsCapacitiesStepGroupOrLocalService {

  private groupOrLocalListSubject = new BehaviorSubject<Array<ICustomSelectOption>>(null);
  private getGroupOrLocalTabSubject = new BehaviorSubject<ECapacityStepGroupOrLocal>(null);
  private groupOrLocalCancelSubject = new BehaviorSubject<boolean>(null);
  private groupOrLocalSaveSubject = new BehaviorSubject<ICustomSelectOption>(null);

  private groupOrLocalStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);

  constructor() {
  }

  get groupOrLocalStepStatus$(): Observable<ECapacityStepStatus> {
    return this.groupOrLocalStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set groupOrLocalStepStatus(groupOrLocalDisabled: ECapacityStepStatus) {
    this.groupOrLocalStepStatusSubject.next(groupOrLocalDisabled);
  }

  get groupOrLocalTab$(): Observable<ECapacityStepGroupOrLocal> {
    return this.getGroupOrLocalTabSubject.asObservable();
  }

  set groupOrLocalTab(groupList: ECapacityStepGroupOrLocal) {
    this.getGroupOrLocalTabSubject.next(groupList);
  }

  get groupOrLocalList$(): Observable<Array<ICustomSelectOption>> {
    return this.groupOrLocalListSubject.asObservable();
  }

  set groupOrLocalList(groupOrLocalList: Array<ICustomSelectOption>) {
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
