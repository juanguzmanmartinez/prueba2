import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadCapacitiesStoreService {
  private currentStep = new BehaviorSubject<string>('0');
  private stepsTabs = new BehaviorSubject<any[]>([]);

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
}
