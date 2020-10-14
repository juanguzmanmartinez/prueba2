import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';
import {ICapacityStepScheduledCapacitySegments} from './models/operations-capacities-step-scheduled-capacity.model';


export enum ECapacitiesStepScheduledCapacity {
  daysRange = 'daysRange',
  hourlyCapacity = 'hourlyCapacity'
}

@Injectable()
export class OperationsCapacitiesStepScheduledCapacityService {

  private scheduledCapacityFormViewSubject = new BehaviorSubject<ECapacitiesStepScheduledCapacity>(ECapacitiesStepScheduledCapacity.daysRange);
  private scheduledCapacitySegmentsSubject = new BehaviorSubject<ICapacityStepScheduledCapacitySegments>(null);

  private scheduledCapacityStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private scheduledCapacityResetStepStatusSubject = new BehaviorSubject<boolean>(null);
  private scheduledCapacitySaveSubject = new BehaviorSubject<ICapacityStepScheduledCapacitySegments>(null);
  private scheduledCapacityCancelSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get scheduledCapacityStepStatus$(): Observable<ECapacityStepStatus> {
    return this.scheduledCapacityStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set scheduledCapacityStepStatus(scheduledCapacityDisabled: ECapacityStepStatus) {
    this.scheduledCapacityStepStatusSubject.next(scheduledCapacityDisabled);
  }


  get scheduledCapacityResetStepStatus$(): Observable<boolean> {
    return this.scheduledCapacityResetStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set scheduledCapacityResetStepStatus(scheduledCapacityResetStep: boolean) {
    this.scheduledCapacityResetStepStatusSubject.next(scheduledCapacityResetStep);
  }


  get scheduledCapacityFormView$(): Observable<ECapacitiesStepScheduledCapacity> {
    return this.scheduledCapacityFormViewSubject.asObservable();
  }

  set scheduledCapacityFormView(scheduledCapacityFormView: ECapacitiesStepScheduledCapacity) {
    this.scheduledCapacityFormViewSubject.next(scheduledCapacityFormView);
  }

  get scheduledCapacitySegments$(): Observable<ICapacityStepScheduledCapacitySegments> {
    return this.scheduledCapacitySegmentsSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set scheduledCapacitySegments(capacitySegments: ICapacityStepScheduledCapacitySegments) {
    this.scheduledCapacitySegmentsSubject.next(capacitySegments);
  }

  get scheduledCapacityCancel$(): Observable<boolean> {
    return this.scheduledCapacityCancelSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set scheduledCapacityCancel(scheduledCapacityCancel: boolean) {
    this.scheduledCapacityCancelSubject.next(scheduledCapacityCancel);
  }

  get scheduledCapacitySave$(): Observable<ICapacityStepScheduledCapacitySegments> {
    return this.scheduledCapacitySaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set scheduledCapacitySave(scheduledCapacityFormValue: ICapacityStepScheduledCapacitySegments) {
    this.scheduledCapacitySaveSubject.next(scheduledCapacityFormValue);
  }

}
