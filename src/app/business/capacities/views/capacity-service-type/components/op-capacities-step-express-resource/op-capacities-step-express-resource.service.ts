import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';
import { ICapacityStepExpressResourceSegments } from './models/op-capacities-step-express-resource.model';
import { CapacityRangeLimit } from '../../models/operations-capacity-converter.model';

export enum ECapacitiesStepExpressResource {
  daysRange = 'daysRange',
  hourlyCapacity = 'hourlyCapacity'
}

@Injectable()
export class OpCapacitiesStepExpressResourceService implements OnDestroy {

  private expressResourceFormViewSubject = new BehaviorSubject<ECapacitiesStepExpressResource>(ECapacitiesStepExpressResource.daysRange);
  private expressResourceSegmentsSubject = new BehaviorSubject<ICapacityStepExpressResourceSegments>(null);
  private expressResourceRangeLimitSubject = new BehaviorSubject<CapacityRangeLimit>(null);

  private expressResourceStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private expressResourceResetStepStatusSubject = new BehaviorSubject<boolean>(null);
  private expressResourceSaveSubject = new BehaviorSubject<ICapacityStepExpressResourceSegments>(null);
  private expressResourceCancelSubject = new BehaviorSubject<boolean>(false);

  private expressResourceEditionAccessPathStored: string;

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

  get expressResourceRangeLimit$(): Observable<CapacityRangeLimit> {
    return this.expressResourceRangeLimitSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set expressResourceRangeLimit(capacityRangeLimit: CapacityRangeLimit) {
    this.expressResourceRangeLimitSubject.next(capacityRangeLimit);
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

  get expressResourceEditionAccessPath(): string {
    return this.expressResourceEditionAccessPathStored;
  }

  set expressResourceEditionAccessPath(expressResourceEditionAccessPath: string) {
    this.expressResourceEditionAccessPathStored = expressResourceEditionAccessPath;
  }

  constructor() { }

  ngOnDestroy(): void {
    this.expressResourceFormViewSubject.complete();
    this.expressResourceSegmentsSubject.complete();
    this.expressResourceRangeLimitSubject.complete();
    this.expressResourceStepStatusSubject.complete();
    this.expressResourceResetStepStatusSubject.complete();
    this.expressResourceSaveSubject.complete();
    this.expressResourceCancelSubject.complete();
  }
}
