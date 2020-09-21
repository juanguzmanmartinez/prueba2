import { Injectable } from '@angular/core';
import { Drugstore } from 'src/app/shared/services/models/drugstore.model';
import { BehaviorSubject } from 'rxjs';
import { IConfigForCapacities } from '../../interfaces/drugstores.interface';
import { IAlert, Local } from 'src/app/shared/services/models/local.model';

@Injectable()
export class CapacityStoreService {

  private _selectedDrugstore: IAlert;
  private _selectedDrugstoreSubject = new BehaviorSubject<IAlert>({} as IAlert);
  public selectedDrugstore$ = this._selectedDrugstoreSubject.asObservable();
  public get selectedDrugstore(): IAlert { return this._selectedDrugstore; }

  constructor() {
    this.selectedDrugstore$.subscribe((selectedDrugstore) => this._selectedDrugstore = selectedDrugstore);
  }

  public setSelectedDrugstore(drugstore: IAlert) {
    this._selectedDrugstoreSubject.next(drugstore);
  }

}
