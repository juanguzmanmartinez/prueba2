import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TABS } from '../constants/step-tabs.constants';

@Injectable({
  providedIn: 'root',
})
export class UploadCapacitiesStoreService {
  private currentStep = new BehaviorSubject<string>('1');
  private stepsTabs = new BehaviorSubject<any[]>(TABS);
  private localToEdit = new BehaviorSubject<any>({});
  private storesList = new BehaviorSubject<any[]>([]);
  private dataSource = new BehaviorSubject<any[]>([]);
  private dataEdited = new BehaviorSubject<any[]>([]);

  stepsTabs$ = this.stepsTabs.asObservable();
  currentStep$ = this.currentStep.asObservable();
  constructor() {}

  setCurrentStep(step: string) {
    this.currentStep.next(step);
  }

  get getCurrentStep$(): Observable<any> {
    return this.currentStep.asObservable().pipe(filter((value) => !!value));
  }

  setStepsTabs(steps: any[]) {
    this.stepsTabs.next(steps);
  }

  get getStepsTabs$(): Observable<any> {
    return this.stepsTabs.asObservable().pipe(filter((value) => !!value));
  }

  setElementToEdit(steps: any[]) {
    this.localToEdit.next(steps);
  }

  get getElementToEdit$(): Observable<any> {
    return this.localToEdit.asObservable().pipe(filter((value) => !!value));
  }

  setStoreList(steps: any[]) {
    this.storesList.next(steps);
  }

  get getStoreList$(): Observable<any> {
    return this.storesList.asObservable().pipe(filter((value) => !!value));
  }

  setDataSource(dataSource: any[]) {
    this.dataSource.next(dataSource);
  }

  get getDataSource$(): Observable<any> {
    return this.dataSource.asObservable().pipe(filter((value) => !!value));
  }

  setDataEdited(dataEdited: any[]) {
    this.dataEdited.next(dataEdited);
  }

  get getDataEdited$(): Observable<any> {
    return this.dataEdited.asObservable().pipe(filter((value) => !!value));
  }
}
