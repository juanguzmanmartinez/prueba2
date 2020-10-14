import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';
import {ICapacityStepAmPmCapacitySegments} from './models/op-capacities-step-am-pm-capacity.model';


export enum ECapacitiesStepAmPmCapacity {
  daysRange = 'daysRange',
  hourlyCapacity = 'hourlyCapacity'
}

@Injectable()
export class OpCapacitiesStepAmPmCapacityService {

  private amPmCapacityFormViewSubject = new BehaviorSubject<ECapacitiesStepAmPmCapacity>(ECapacitiesStepAmPmCapacity.daysRange);
  private amPmCapacitySegmentsSubject = new BehaviorSubject<ICapacityStepAmPmCapacitySegments>(null);

  private amPmCapacityStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private amPmCapacityResetStepStatusSubject = new BehaviorSubject<boolean>(null);
  private amPmCapacitySaveSubject = new BehaviorSubject<ICapacityStepAmPmCapacitySegments>(null);
  private amPmCapacityCancelSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get amPmCapacityStepStatus$(): Observable<ECapacityStepStatus> {
    return this.amPmCapacityStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set amPmCapacityStepStatus(amPmCapacityDisabled: ECapacityStepStatus) {
    this.amPmCapacityStepStatusSubject.next(amPmCapacityDisabled);
  }


  get amPmCapacityResetStepStatus$(): Observable<boolean> {
    return this.amPmCapacityResetStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set amPmCapacityResetStepStatus(amPmCapacityResetStep: boolean) {
    this.amPmCapacityResetStepStatusSubject.next(amPmCapacityResetStep);
  }


  get amPmCapacityFormView$(): Observable<ECapacitiesStepAmPmCapacity> {
    return this.amPmCapacityFormViewSubject.asObservable();
  }

  set amPmCapacityFormView(amPmCapacityFormView: ECapacitiesStepAmPmCapacity) {
    this.amPmCapacityFormViewSubject.next(amPmCapacityFormView);
  }

  get amPmCapacitySegments$(): Observable<ICapacityStepAmPmCapacitySegments> {
    return this.amPmCapacitySegmentsSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set amPmCapacitySegments(capacitySegments: ICapacityStepAmPmCapacitySegments) {
    this.amPmCapacitySegmentsSubject.next(capacitySegments);
  }

  get amPmCapacityCancel$(): Observable<boolean> {
    return this.amPmCapacityCancelSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set amPmCapacityCancel(amPmCapacityCancel: boolean) {
    this.amPmCapacityCancelSubject.next(amPmCapacityCancel);
  }

  get amPmCapacitySave$(): Observable<ICapacityStepAmPmCapacitySegments> {
    return this.amPmCapacitySaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set amPmCapacitySave(amPmCapacityFormValue: ICapacityStepAmPmCapacitySegments) {
    this.amPmCapacitySaveSubject.next(amPmCapacityFormValue);
  }

}
