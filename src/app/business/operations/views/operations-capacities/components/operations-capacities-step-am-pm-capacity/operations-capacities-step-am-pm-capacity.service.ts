import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ECapacityStepStatus} from '../../models/capacity-step-status.model';
import {IDatepickerRange} from '../../../../../../commons/core-components/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';


export enum ECapacitiesStepAmPmCapacity {
  daysRange = 'daysRange',
  hourlyCapacity = 'hourlyCapacity'
}

export interface ICapacityStepAmPmCapacitySegment {
  segmentHour: string;
  segmentCapacity: number;
}

export interface ICapacityStepAmPmCapacitySegments {
  amSegment: ICapacityStepAmPmCapacitySegment;
  pmSegment: ICapacityStepAmPmCapacitySegment;
}

export interface ICapacityStepAmPmCapacityFormValue {
  capacityRange: IDatepickerRange;
  amCapacity: number;
  pmCapacity: number;
}

@Injectable()
export class OperationsCapacitiesStepAmPmCapacityService {

  private amPmCapacityFormViewSubject = new BehaviorSubject<ECapacitiesStepAmPmCapacity>(ECapacitiesStepAmPmCapacity.daysRange);
  private amPmCapacitySegmentsSubject = new BehaviorSubject<ICapacityStepAmPmCapacitySegments>(null);
  private amPmCapacitySaveSubject = new BehaviorSubject<ICapacityStepAmPmCapacityFormValue>(null);
  private amPmCapacityCancelSubject = new BehaviorSubject<boolean>(false);

  private amPmCapacityStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private amPmCapacityResetStepStatusSubject = new BehaviorSubject<boolean>(null);

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

  get amPmCapacitySave$(): Observable<ICapacityStepAmPmCapacityFormValue> {
    return this.amPmCapacitySaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set amPmCapacitySave(amPmCapacityFormValue: ICapacityStepAmPmCapacityFormValue) {
    this.amPmCapacitySaveSubject.next(amPmCapacityFormValue);
  }

}
