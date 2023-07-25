import { Injectable, LOCALE_ID } from '@angular/core';
import { CarrierStore } from '../store/carrier.store';
import { Observable } from 'rxjs';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { ControlTowerImplementService } from 'app/business/control-tower/implements/control-tower.implement.service';
import { tap } from 'rxjs/operators';
import { ICarrierFilter } from '../interfaces/carrier.interface';
import { LocalFilter } from 'app/business/control-tower/models/local-filter.model';
import { CarrierStateFilter } from 'app/business/control-tower/models/carrier-state-filter.model';
import { ExportTableSelection } from 'app/shared/utils/export-table-selection.util';

@Injectable()
export class CarrierService {
  constructor(
    private carrierStore: CarrierStore,
    private ctImplService: ControlTowerImplementService
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

  loadCarrierList(): Observable<Carrier[]> {
    return this.ctImplService
      .getCarrierList()
      .pipe(
        tap((carrierList) => this.carrierStore.loadCarrierList(carrierList))
      );
  }

  loadLocalList(): Observable<LocalFilter[]> {
    return this.ctImplService
      .getLocalList()
      .pipe(tap((localList) => this.carrierStore.setLocalList(localList)));
  }

  loadCarrierStateList(): Observable<CarrierStateFilter[]> {
    return this.ctImplService
      .getCarrierStateList()
      .pipe(
        tap((carrierStateList) =>
          this.carrierStore.setCarrierStateList(carrierStateList)
        )
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
}
