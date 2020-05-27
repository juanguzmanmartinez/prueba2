import { Injectable } from '@angular/core';
import { Drugstore } from 'src/app/shared/services/models/drugstore.model';
import { BehaviorSubject } from 'rxjs';
import { IConfigForCapacities } from '../../interfaces/drugstores.interface';

@Injectable()
export class CompanyDrugstoresStoreService {

  private _drugstores: Drugstore[];
  private _drugstoresSubject = new BehaviorSubject<Drugstore[]>([]);
  public drugstores$ = this._drugstoresSubject.asObservable();
  public get drugstores(): Drugstore[] { return this._drugstores; }

  private _selectedDrugstore: Drugstore;
  private _selectedDrugstoreSubject = new BehaviorSubject<Drugstore>({} as Drugstore);
  public selectedDrugstore$ = this._selectedDrugstoreSubject.asObservable();
  public get selectedDrugstore(): Drugstore { return this._selectedDrugstore; }

  private _configForCapacities: IConfigForCapacities;
  private _configForCapacitiesSubject = new BehaviorSubject<IConfigForCapacities>({} as IConfigForCapacities);
  public configForCapacities$ = this._configForCapacitiesSubject.asObservable();
  public get configForCapacities(): IConfigForCapacities { return this._configForCapacities; }

  constructor() {
    this.drugstores$.subscribe((drugstores) => this._drugstores = drugstores);
    this.selectedDrugstore$.subscribe((selectedDrugstore) => this._selectedDrugstore = selectedDrugstore);
    this.configForCapacities$.subscribe((configForCapacities) => this._configForCapacities = configForCapacities);
  }

  public setDrugstores(drugstores: Drugstore[]) {
    this._drugstoresSubject.next(drugstores);
  }

  public setSelectedDrugstore(drugstore: Drugstore) {
    this._selectedDrugstore = drugstore;
  }

  public setSelectedDrugstoreByLocalCode(code: string) {
    const selectedDrugstore = this.drugstores.find(d => d.localCode === code);
    this.setSelectedDrugstore(selectedDrugstore);
  }

  public setConfigForCapacities(config: IConfigForCapacities) {
    this._configForCapacitiesSubject.next(config);
  }

  public setSelectedDayForCapacitites(day: string) {
    const config = { ...this.configForCapacities };
    config.selectedDay = day;
    this.setConfigForCapacities(config);
  }
}

