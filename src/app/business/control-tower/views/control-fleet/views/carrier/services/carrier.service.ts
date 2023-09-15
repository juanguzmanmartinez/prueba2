import { Injectable, LOCALE_ID } from '@angular/core';
import { CarrierStore } from '../store/carrier.store';
import { Observable, of } from 'rxjs';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { ControlTowerImplementService } from 'app/business/control-tower/implements/control-tower.implement.service';
import { catchError, tap } from 'rxjs/operators';
import { ICarrierFilter } from '../interfaces/carrier.interface';
import { LocalFilter } from 'app/business/control-tower/models/local-filter.model';
import { CarrierStateFilter } from 'app/business/control-tower/models/carrier-state-filter.model';
import { ExportTableSelection } from 'app/shared/utils/export-table-selection.util';
import { SortEvent } from '@interfaces/vita/table.interface';
import { CarrierFilterFormService } from './carrier-filter-form.service';

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
        const storedSortEvent = localStorage.getItem('sortEvent');
        if (storedSortEvent) {
          const sortEvent = JSON.parse(storedSortEvent);
          this.sortColumn(sortEvent);
        }
      }),
      catchError(() => {
        this.carrierStore.setErrorLoadCarrierList(true);
        return of([]);
      })
    );
  }

  loadLocalList(): Observable<LocalFilter[]> {
    return this.ctImplService.getLocalList().pipe(
      tap((localList) => {
        this.carrierStore.setLocalList(localList);
        const storedLocalFilter = localStorage.getItem('cfLocalFilter');
        if (storedLocalFilter) {
          const localFilter = JSON.parse(storedLocalFilter);
          this.carrierFilterForm.localsControl().setValue(localFilter);
        }
      })
    );
  }

  loadCarrierStateList(): Observable<CarrierStateFilter[]> {
    return this.ctImplService.getCarrierStateList().pipe(
      tap((carrierStateList) => {
        console.log(carrierStateList);
        this.carrierStore.setCarrierStateList(carrierStateList);
        const storedStateFilter = localStorage.getItem('cfStateFilter');
        if (storedStateFilter) {
          const stateFilter = JSON.parse(storedStateFilter);
          this.carrierFilterForm.carrierStateControl().setValue(stateFilter);
        }
      })
    );
  }

  filterCarrierList(carrierFilter: ICarrierFilter): void {
    const { locals, carrierStates } = carrierFilter;

    if (locals?.length === 0 && carrierStates?.length === 0) {
      this.carrierStore.loadInitialCarrierList();
    } else {
      this.carrierStore.filterCarrierList(carrierFilter);
    }
  }

  hasFilterStorage(): boolean {
    const storedLocalFilter = localStorage.getItem('cfLocalFilter');
    const storedStateFilter = localStorage.getItem('cfStateFilter');
    if (storedLocalFilter || storedStateFilter) {
      const localFilter = JSON.parse(storedLocalFilter);
      const stateFilter = JSON.parse(storedStateFilter);
      if (localFilter.length > 0 || stateFilter.length > 0) {
        return true;
      }
    }
    return false;
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

    localStorage.setItem('sortEvent', JSON.stringify(event));
  }
}
