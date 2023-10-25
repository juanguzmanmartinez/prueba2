import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DrugstoreDetail } from '../../../models/operations-drugstores.model';
import { HttpErrorResponse } from '@angular/common/http';

export type TStoreDetail = DrugstoreDetail | HttpErrorResponse;

@Injectable()
export class OperationsDrugstoresEditionStoreService implements OnDestroy {

  private storeDetailSubject = new BehaviorSubject<TStoreDetail>(null);
  private updateStoreDetailSubject = new BehaviorSubject<boolean>(null);

  get storeDetail$(): Observable<TStoreDetail> {
    return this.storeDetailSubject.asObservable()
      .pipe(
        filter(value => value instanceof DrugstoreDetail || value instanceof HttpErrorResponse)
      );
  }

  set drugstoreDetail(storeDetail: DrugstoreDetail) {
    this.storeDetailSubject.next(storeDetail);
  }

  set drugstoreDetailError(error: any) {
    this.storeDetailSubject.next(error);
  }

  get updateDrugstoreDetail$(): Observable<boolean> {
    return this.updateStoreDetailSubject.asObservable()
      .pipe(filter(value => !!value));
  }

  set updateDrugstoreDetail(updateZoneDetail: boolean) {
    this.updateStoreDetailSubject.next(updateZoneDetail);
  }

  constructor() { }

  ngOnDestroy(): void {
    this.storeDetailSubject.complete();
    this.updateStoreDetailSubject.complete();
  }
}
