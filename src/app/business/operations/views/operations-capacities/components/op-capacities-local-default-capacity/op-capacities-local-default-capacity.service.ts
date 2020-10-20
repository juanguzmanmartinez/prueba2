import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity} from '../../models/operations-capacities-responses.model';


@Injectable()
export class OpCapacitiesLocalDefaultCapacityService {

  private localDefaultCapacityLocalListSubject = new BehaviorSubject<CapacitiesLocal[]>(null);
  private localDefaultCapacityLocalSelectionSubject = new BehaviorSubject<CapacitiesLocal>(null);
  private localDefaultCapacityLocalServiceListSubject = new BehaviorSubject<CapacitiesLocalServiceDefaultCapacity[]>(null);

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

  get localDefaultCapacityLocalServiceList$() {
    return this.localDefaultCapacityLocalServiceListSubject.asObservable()
      .pipe(filter((value) => !!value));
  }

  set localDefaultCapacityLocalServiceList(serviceDefaultCapacityList: CapacitiesLocalServiceDefaultCapacity[]) {
    this.localDefaultCapacityLocalServiceListSubject.next(serviceDefaultCapacityList);
  }

}
