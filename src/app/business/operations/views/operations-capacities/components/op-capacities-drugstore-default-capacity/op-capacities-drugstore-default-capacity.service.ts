import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CapacitiesDrugstore, CapacitiesDrugstoreServiceDefaultCapacity, CapacitiesServiceType } from '../../models/operations-capacities-responses.model';


@Injectable()
export class OpCapacitiesDrugstoreDefaultCapacityService {

    private drugstoreListSubject = new BehaviorSubject<CapacitiesDrugstore[]>(null);
    private drugstoreSelectionSubject = new BehaviorSubject<CapacitiesDrugstore>(null);
    private drugstoreServiceTypeListSubject = new BehaviorSubject<CapacitiesDrugstoreServiceDefaultCapacity[]>(null);
    private drugstoreServiceTypeSelectionSubject = new BehaviorSubject<CapacitiesDrugstoreServiceDefaultCapacity>(null);
    private drugstoreDefaultCapacityListSubject = new BehaviorSubject<CapacitiesServiceType>(null);

    constructor() {
    }

    get drugstoreList$(): Observable<CapacitiesDrugstore[]> {
        return this.drugstoreListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set drugstoreList(capacitiesDrugstoreList: CapacitiesDrugstore[]) {
        this.drugstoreListSubject.next(capacitiesDrugstoreList);
    }

    get drugstoreSelection$(): Observable<CapacitiesDrugstore> {
        return this.drugstoreSelectionSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set drugstoreSelection(capacitiesDrugstore: CapacitiesDrugstore) {
        this.drugstoreSelectionSubject.next(capacitiesDrugstore);
    }

    get drugstoreServiceList$(): Observable<CapacitiesDrugstoreServiceDefaultCapacity[]> {
        return this.drugstoreServiceTypeListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set drugstoreServiceList(serviceDefaultCapacityList: CapacitiesDrugstoreServiceDefaultCapacity[]) {
        this.drugstoreServiceTypeListSubject.next(serviceDefaultCapacityList);
    }

    get drugstoreServiceTypeSelection$(): Observable<CapacitiesDrugstoreServiceDefaultCapacity> {
        return this.drugstoreServiceTypeSelectionSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set drugstoreServiceTypeSelection(serviceDefaultCapacity: CapacitiesDrugstoreServiceDefaultCapacity) {
        this.drugstoreServiceTypeSelectionSubject.next(serviceDefaultCapacity);
    }

    get drugstoreDefaultCapacityList$(): Observable<CapacitiesServiceType> {
        return this.drugstoreDefaultCapacityListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set drugstoreDefaultCapacityList(capacitiesServiceType: CapacitiesServiceType) {
        this.drugstoreDefaultCapacityListSubject.next(capacitiesServiceType);
    }

}
