import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CapacitiesDrugstore, CapacitiesDrugstoreServiceDefaultCapacity, CapacitiesServiceType } from '../../models/operations-capacities-responses.model';


@Injectable()
export class OpCapacitiesDrugstoreDefaultCapacityService {

    private localDefaultCapacityLocalListSubject = new BehaviorSubject<CapacitiesDrugstore[]>(null);
    private localDefaultCapacityLocalSelectionSubject = new BehaviorSubject<CapacitiesDrugstore>(null);
    private localDefaultCapacityLocalServiceTypeListSubject = new BehaviorSubject<CapacitiesDrugstoreServiceDefaultCapacity[]>(null);
    private localDefaultCapacityLocalServiceTypeSelectionSubject = new BehaviorSubject<CapacitiesDrugstoreServiceDefaultCapacity>(null);
    private localDefaultCapacityListSubject = new BehaviorSubject<CapacitiesServiceType>(null);

    constructor() {
    }

    get drugstoreDefaultCapacityDrugstoreList$(): Observable<CapacitiesDrugstore[]> {
        return this.localDefaultCapacityLocalListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityLocalList(capacitiesLocalList: CapacitiesDrugstore[]) {
        this.localDefaultCapacityLocalListSubject.next(capacitiesLocalList);
    }

    get localDefaultCapacityLocalSelection$(): Observable<CapacitiesDrugstore> {
        return this.localDefaultCapacityLocalSelectionSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set drugstoreDefaultCapacityDrugstoreSelection(capacitiesLocal: CapacitiesDrugstore) {
        this.localDefaultCapacityLocalSelectionSubject.next(capacitiesLocal);
    }

    get drugstoreDefaultCapacityDrugstoreServiceList$(): Observable<CapacitiesDrugstoreServiceDefaultCapacity[]> {
        return this.localDefaultCapacityLocalServiceTypeListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityLocalServiceList(serviceDefaultCapacityList: CapacitiesDrugstoreServiceDefaultCapacity[]) {
        this.localDefaultCapacityLocalServiceTypeListSubject.next(serviceDefaultCapacityList);
    }

    get localDefaultCapacityLocalServiceTypeSelection$(): Observable<CapacitiesDrugstoreServiceDefaultCapacity> {
        return this.localDefaultCapacityLocalServiceTypeSelectionSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set drugstoreDefaultCapacityDrugstoreServiceTypeSelection(serviceDefaultCapacity: CapacitiesDrugstoreServiceDefaultCapacity) {
        this.localDefaultCapacityLocalServiceTypeSelectionSubject.next(serviceDefaultCapacity);
    }

    get drugstoreDefaultCapacityList$(): Observable<CapacitiesServiceType> {
        return this.localDefaultCapacityListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityList(capacitiesServiceType: CapacitiesServiceType) {
        this.localDefaultCapacityListSubject.next(capacitiesServiceType);
    }

}
