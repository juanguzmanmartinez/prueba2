import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ECapacityStepStatus} from '../../models/operations-capacity-step-status.model';
import {ICapacityStepExpressResourceSegments} from './models/operations-capacities-step-express-resource.model';


export enum ECapacitiesStepExpressResource {
  daysRange = 'daysRange',
  hourlyCapacity = 'hourlyCapacity'
}

@Injectable()
export class OperationsCapacitiesStepExpressResourceService {

  private expressResourceFormViewSubject = new BehaviorSubject<ECapacitiesStepExpressResource>(ECapacitiesStepExpressResource.daysRange);
  private expressResourceSegmentsSubject = new BehaviorSubject<ICapacityStepExpressResourceSegments>(null);

  private expressResourceStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private expressResourceResetStepStatusSubject = new BehaviorSubject<boolean>(null);
  private expressResourceSaveSubject = new BehaviorSubject<ICapacityStepExpressResourceSegments>(null);
  private expressResourceCancelSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get expressResourceStepStatus$(): Observable<ECapacityStepStatus> {
    return this.expressResourceStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set expressResourceStepStatus(expressResourceDisabled: ECapacityStepStatus) {
    this.expressResourceStepStatusSubject.next(expressResourceDisabled);
  }


  get expressResourceResetStepStatus$(): Observable<boolean> {
    return this.expressResourceResetStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set expressResourceResetStepStatus(expressResourceResetStep: boolean) {
    this.expressResourceResetStepStatusSubject.next(expressResourceResetStep);
  }


  get expressResourceFormView$(): Observable<ECapacitiesStepExpressResource> {
    return this.expressResourceFormViewSubject.asObservable();
  }

  set expressResourceFormView(expressResourceFormView: ECapacitiesStepExpressResource) {
    this.expressResourceFormViewSubject.next(expressResourceFormView);
  }

  get expressResourceSegments$(): Observable<ICapacityStepExpressResourceSegments> {
    return this.expressResourceSegmentsSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set expressResourceSegments(capacitySegments: ICapacityStepExpressResourceSegments) {
    this.expressResourceSegmentsSubject.next(capacitySegments);
  }

  get expressResourceCancel$(): Observable<boolean> {
    return this.expressResourceCancelSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set expressResourceCancel(expressResourceCancel: boolean) {
    this.expressResourceCancelSubject.next(expressResourceCancel);
  }

  get expressResourceSave$(): Observable<ICapacityStepExpressResourceSegments> {
    return this.expressResourceSaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set expressResourceSave(expressResourceFormValue: ICapacityStepExpressResourceSegments) {
    this.expressResourceSaveSubject.next(expressResourceFormValue);
  }

}
