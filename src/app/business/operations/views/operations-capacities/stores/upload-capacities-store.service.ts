import { Injectable } from '@angular/core';
import {
  IStoreProcessed,
  IStoreUpload,
} from '@interfaces/capacities/upload-capacities.interface';
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
  private storesList = new BehaviorSubject<IStoreUpload[]>([]);
  private dataSource = new BehaviorSubject<IStoreProcessed[]>([]);
  private dataRaw = new BehaviorSubject<any[]>([
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '07:00 am - 09:00 am',
      value: '07:00:00',
      capacity: 10,
    },
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '09:00 am - 11:00 am',
      value: '09:00:00',
      capacity: 10,
    },
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '11:00 am - 01:00 pm',
      value: '11:00:00',
      capacity: 10,
    },
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '01:00 pm - 03:00 pm',
      value: '13:00:00',
      capacity: 10,
    },
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '03:00 pm - 05:00 pm',
      value: '15:00:00',
      capacity: 10,
    },
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '05:00 pm - 07:00 pm',
      value: '17:00:00',
      capacity: 10,
    },
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '07:00 pm - 09:00 pm',
      value: '19:00:00',
      capacity: 10,
    },
    {
      service: 'PROG',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '09:00 pm - 10:00 pm',
      value: '21:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '08:00 am - 09:00 am',
      value: '08:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '09:00 am - 10:00 am',
      value: '09:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '10:00 am - 11:00 am',
      value: '10:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '11:00 am - 12:00 pm',
      value: '11:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '12:00 pm - 01:00 pm',
      value: '12:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '01:00 pm - 02:00 pm',
      value: '13:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '02:00 pm - 03:00 pm',
      value: '14:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '03:00 pm - 04:00 pm',
      value: '15:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '04:00 pm - 05:00 pm',
      value: '16:00:00',
      capacity: 10,
    },
    {
      service: 'RET',
      storeCode: 'EE1',
      storeName: 'CHORRILLOS 7',
      timeRange: '05:00 pm - 06:00 pm',
      value: '17:00:00',
      capacity: 10,
    },
  ]);

  private departamentsFilter = new BehaviorSubject<any[]>([]);
  private provincesFilter = new BehaviorSubject<any[]>([]);
  private districtsFilter = new BehaviorSubject<any[]>([]);
  private storesFilter = new BehaviorSubject<any[]>([]);

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

  setStoreList(steps: IStoreUpload[]) {
    this.storesList.next(steps);
  }

  get getStoreList$(): Observable<IStoreUpload[]> {
    return this.storesList.asObservable().pipe(filter((value) => !!value));
  }

  setDataSource(dataSource: IStoreProcessed[]) {
    this.dataSource.next(dataSource);
  }

  get getDataSource$(): Observable<IStoreProcessed[]> {
    return this.dataSource.asObservable().pipe(filter((value) => !!value));
  }

  setDataRaw(dataEdited: any[]) {
    this.dataRaw.next(dataEdited);
  }

  get getDataRaw$(): Observable<any> {
    return this.dataRaw.asObservable().pipe(filter((value) => !!value));
  }

  setDepartamentsFilter(dataEdited: any[]) {
    this.departamentsFilter.next(dataEdited);
  }

  get getDepartamentsFilter$(): Observable<any> {
    return this.departamentsFilter
      .asObservable()
      .pipe(filter((value) => !!value));
  }

  setProvincesFilter(dataEdited: any[]) {
    this.provincesFilter.next(dataEdited);
  }

  get getProvincesFilter$(): Observable<any> {
    return this.provincesFilter.asObservable().pipe(filter((value) => !!value));
  }

  setDistrictsFilter(dataEdited: any[]) {
    this.districtsFilter.next(dataEdited);
  }

  get getDistrictsFilter$(): Observable<any> {
    return this.districtsFilter.asObservable().pipe(filter((value) => !!value));
  }

  setStoresFilter(dataEdited: any[]) {
    this.storesFilter.next(dataEdited);
  }

  get getStoresFilter$(): Observable<any> {
    return this.storesFilter.asObservable().pipe(filter((value) => !!value));
  }
}
