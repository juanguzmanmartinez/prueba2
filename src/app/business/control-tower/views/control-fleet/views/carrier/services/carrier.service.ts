import { Injectable, LOCALE_ID } from '@angular/core';
import { CarrierStore } from '../store/carrier.store';
import { Observable, of, throwError } from 'rxjs';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { ControlTowerImplementService } from 'app/business/control-tower/implements/control-tower.implement.service';
import { catchError, retry, tap } from 'rxjs/operators';
import { ICarrierFilter } from '../interfaces/carrier.interface';
import { LocalFilter } from 'app/business/control-tower/models/local-filter.model';
import { CarrierStateFilter } from 'app/business/control-tower/models/carrier-state-filter.model';
import { ExportTableSelection } from 'app/shared/utils/export-table-selection.util';
import { SortEvent } from '@interfaces/vita/table.interface';
import { CarrierFilterFormService } from './carrier-filter-form.service';
import { IPillFilter } from '@interfaces/control-tower/control-tower.filter.interface';

@Injectable()
export class CarrierService {
  constructor(
    private carrierStore: CarrierStore,
    private ctImplService: ControlTowerImplementService,
    private carrierFilterForm: CarrierFilterFormService
  ) {}

  getCarrierList(): Observable<Carrier[]> {
    return this.carrierStore.carrierList$;
  }

  getLocalList(): Observable<LocalFilter[]> {
    return this.carrierStore.localList$;
  }

  getCarrierStateList(): Observable<CarrierStateFilter[]> {
    return this.carrierStore.carrierStateList$;
  }

  setLoadingCarrierList(loading: boolean): void {
    this.carrierStore.setloadingCarrierList(loading);
  }

  getLoadingCarrierList(): Observable<boolean> {
    return this.carrierStore.loadingCarrierList$;
  }

  getErrorCarrierList(): Observable<boolean> {
    return this.carrierStore.errorLoadCarrierList$;
  }

  loadCarrierList(): Observable<Carrier[]> {
    this.setLoadingCarrierList(true);
    return this.ctImplService.getCarrierList().pipe(
      tap((carrierList) => {
        this.carrierStore.setErrorLoadCarrierList(false);
        this.carrierStore.loadCarrierList(carrierList);
      }),
      catchError((error) => {
        this.carrierStore.setErrorLoadCarrierList(true);
        return throwError(error);
      })
    );
  }

  loadLocalList(): Observable<LocalFilter[]> {
    return this.ctImplService.getLocalList().pipe(
      retry(2),
      tap((localList) => {
        this.carrierStore.setLocalList(localList);
      }),
      catchError((error) => {
        this.carrierStore.setErrorLoadLocalList(true);
        return throwError(error);
      })
    );
  }

  loadCarrierStateList(): Observable<CarrierStateFilter[]> {
    return this.ctImplService.getCarrierStateList().pipe(
      retry(2),
      tap((carrierStateList) => {
        this.carrierStore.setCarrierStateList(carrierStateList);
      }),
      catchError((error) => {
        this.carrierStore.setErrorLoadStateList(true);
        return throwError(error);
      })
    );
  }

  filterCarrierList(): void {
    const locals = this.carrierStore.localSelectedListValue();
    const carrierStates = this.carrierStore.stateSelectedListValue();

    if (locals?.length === 0 && carrierStates?.length === 0) {
      this.carrierStore.loadInitialCarrierList();
    } else {
      this.carrierStore.filterCarrierList();
    }
  }

  getFilterSelectedList() {
    const states = this.carrierStore.stateSelectedListPillValue();
    const locals = this.carrierStore.localSelectedListPillValue();
    return [...states, ...locals];
  }

  resetFilterSelected(): void {
    this.carrierStore.setLocalSelectedList([]);
    this.carrierStore.setStateSelectedList([]);
    this.carrierFilterForm.localsControl().reset();
    this.carrierFilterForm.carrierStateControl().reset();
  }

  downloadMotorized(): void {
    const carrierList = this.carrierStore.carrierListValue();
    try {
      const data = carrierList.map((carrier) => {
        return {
          ['Local']: carrier.local,
          ['Nombre transportista']: carrier.carrier,
          ['Proveedor']: carrier.provider,
          ['Hora ingreso']: carrier.startHour,
          ['Estado']: carrier.state,
          ['Pausado']: carrier.paused,
        };
      });
      ExportTableSelection.exportArrayToExcel(data, 'Motorizados');
    } catch (error) {
      throw new Error(error);
    }
  }

  sortColumn(event: SortEvent) {
    const { column, order } = event;

    if (order === 'N') {
      this.carrierStore.loadInitialCarrierList();
    } else {
      if (column === 'paused') {
        this.carrierStore.sortTableByPaused(event);
      } else {
        this.carrierStore.sortCarrierList(event);
      }
    }
  }
}
