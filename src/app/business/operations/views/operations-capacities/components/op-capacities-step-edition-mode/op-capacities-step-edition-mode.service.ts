import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';

export enum ECapacitiesStepEditionMode {
  calendar = 'CALENDAR',
  default = 'DEFAULT'
}


@Injectable()
export class OpCapacitiesStepEditionModeService {

  private editionModeCancelSubject = new BehaviorSubject<boolean>(null);
  private editionModeSaveSubject = new BehaviorSubject<ECapacitiesStepEditionMode>(null);

  private editionModeStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private editionModeResetStepStatusSubject = new BehaviorSubject<boolean>(null);

  constructor() {
  }

  get editionModeStepStatus$(): Observable<ECapacityStepStatus> {
    return this.editionModeStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set editionModeStepStatus(editionModeDisabled: ECapacityStepStatus) {
    this.editionModeStepStatusSubject.next(editionModeDisabled);
  }

  get editionModeResetStepStatus$(): Observable<boolean> {
    return this.editionModeResetStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set editionModeResetStepStatus(editionModeResetStep: boolean) {
    this.editionModeResetStepStatusSubject.next(editionModeResetStep);
  }


  get editionModeCancel$(): Observable<boolean> {
    return this.editionModeCancelSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set editionModeCancel(groupOrLocalCancel: boolean) {
    this.editionModeCancelSubject.next(groupOrLocalCancel);
  }

  get editionModeSave$(): Observable<ECapacitiesStepEditionMode> {
    return this.editionModeSaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set editionModeSave(editionModeSelection: ECapacitiesStepEditionMode) {
    this.editionModeSaveSubject.next(editionModeSelection);
  }

}
