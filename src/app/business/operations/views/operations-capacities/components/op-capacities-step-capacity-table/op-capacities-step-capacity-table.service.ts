import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ECapacityStepStatus } from '../../models/operations-capacity-step-status.model';
import { ICapacityStepCapacityTableSegments } from './models/op-capacities-step-capacity-table.model';
import { CapacityRangeLimit } from '../../models/operations-capacity-converter.model';


export enum ECapacitiesStepCapacityTable {
  daysRange = 'daysRange',
  hourlyCapacity = 'hourlyCapacity'
}

@Injectable()
export class OpCapacitiesStepCapacityTableService {

  private capacityTableFormViewSubject = new BehaviorSubject<ECapacitiesStepCapacityTable>(ECapacitiesStepCapacityTable.daysRange);
  private capacityTableSegmentsSubject = new BehaviorSubject<ICapacityStepCapacityTableSegments>(null);
  private capacityTableRangeLimitSubject = new BehaviorSubject<CapacityRangeLimit>(null);

  private capacityTableStepStatusSubject = new BehaviorSubject<ECapacityStepStatus>(null);
  private capacityTableResetStepStatusSubject = new BehaviorSubject<boolean>(null);
  private capacityTableSaveSubject = new BehaviorSubject<ICapacityStepCapacityTableSegments>(null);
  private capacityTableCancelSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get capacityTableStepStatus$(): Observable<ECapacityStepStatus> {
    return this.capacityTableStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set capacityTableStepStatus(capacityTableDisabled: ECapacityStepStatus) {
    this.capacityTableStepStatusSubject.next(capacityTableDisabled);
  }


  get capacityTableResetStepStatus$(): Observable<boolean> {
    return this.capacityTableResetStepStatusSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set capacityTableResetStepStatus(capacityTableResetStep: boolean) {
    this.capacityTableResetStepStatusSubject.next(capacityTableResetStep);
  }


  get capacityTableFormView$(): Observable<ECapacitiesStepCapacityTable> {
    return this.capacityTableFormViewSubject.asObservable();
  }

  set capacityTableFormView(capacityTableFormView: ECapacitiesStepCapacityTable) {
    this.capacityTableFormViewSubject.next(capacityTableFormView);
  }

  get capacityTableSegments$(): Observable<ICapacityStepCapacityTableSegments> {
    return this.capacityTableSegmentsSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set capacityTableSegments(capacitySegments: ICapacityStepCapacityTableSegments) {
    this.capacityTableSegmentsSubject.next(capacitySegments);
  }

  get capacityTableRangeLimit$(): Observable<CapacityRangeLimit> {
    return this.capacityTableRangeLimitSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set capacityTableRangeLimit(capacityRangeLimit: CapacityRangeLimit) {
    this.capacityTableRangeLimitSubject.next(capacityRangeLimit);
  }

  get capacityTableCancel$(): Observable<boolean> {
    return this.capacityTableCancelSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set capacityTableCancel(capacityTableCancel: boolean) {
    this.capacityTableCancelSubject.next(capacityTableCancel);
  }

  get capacityTableSave$(): Observable<ICapacityStepCapacityTableSegments> {
    return this.capacityTableSaveSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set capacityTableSave(capacityTableFormValue: ICapacityStepCapacityTableSegments) {
    this.capacityTableSaveSubject.next(capacityTableFormValue);
  }

}
