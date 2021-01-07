import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity, CapacitiesServiceType } from '../../models/operations-capacities-responses.model';


@Injectable()
export class OpCapacitiesLocalDefaultCapacityService {

    private localDefaultCapacityLocalListSubject = new BehaviorSubject<CapacitiesLocal[]>(null);
    private localDefaultCapacityLocalSelectionSubject = new BehaviorSubject<CapacitiesLocal>(null);
    private localDefaultCapacityLocalServiceTypeListSubject = new BehaviorSubject<CapacitiesLocalServiceDefaultCapacity[]>(null);
    private localDefaultCapacityLocalServiceTypeSelectionSubject = new BehaviorSubject<CapacitiesLocalServiceDefaultCapacity>(null);
    private localDefaultCapacityListSubject = new BehaviorSubject<CapacitiesServiceType>(null);

    constructor() {
    }

    get localDefaultCapacityLocalList$(): Observable<CapacitiesLocal[]> {
        return this.localDefaultCapacityLocalListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityLocalList(capacitiesLocalList: CapacitiesLocal[]) {
        this.localDefaultCapacityLocalListSubject.next(capacitiesLocalList);
    }

    get localDefaultCapacityLocalSelection$(): Observable<CapacitiesLocal> {
        return this.localDefaultCapacityLocalSelectionSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityLocalSelection(capacitiesLocal: CapacitiesLocal) {
        this.localDefaultCapacityLocalSelectionSubject.next(capacitiesLocal);
    }

    get localDefaultCapacityLocalServiceList$(): Observable<CapacitiesLocalServiceDefaultCapacity[]> {
        return this.localDefaultCapacityLocalServiceTypeListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityLocalServiceList(serviceDefaultCapacityList: CapacitiesLocalServiceDefaultCapacity[]) {
        this.localDefaultCapacityLocalServiceTypeListSubject.next(serviceDefaultCapacityList);
    }

    get localDefaultCapacityLocalServiceTypeSelection$(): Observable<CapacitiesLocalServiceDefaultCapacity> {
        return this.localDefaultCapacityLocalServiceTypeSelectionSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityLocalServiceTypeSelection(serviceDefaultCapacity: CapacitiesLocalServiceDefaultCapacity) {
        this.localDefaultCapacityLocalServiceTypeSelectionSubject.next(serviceDefaultCapacity);
    }

    get localDefaultCapacityList$(): Observable<CapacitiesServiceType> {
        return this.localDefaultCapacityListSubject.asObservable()
            .pipe(filter((value) => !!value));
    }

    set localDefaultCapacityList(capacitiesServiceType: CapacitiesServiceType) {
        this.localDefaultCapacityListSubject.next(capacitiesServiceType);
    }

}
