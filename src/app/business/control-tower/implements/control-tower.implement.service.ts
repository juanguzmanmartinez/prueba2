import { Injectable } from '@angular/core';
import { ControlTowerClientService } from '@clients/control-tower/control-tower.service';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Carrier } from '../models/carrier.model';
import { CarrierListDBDummy } from '../db-example/carrier-list.db';
import { CarrierStateDBDummy } from '../db-example/carrier-state.db';
import { LocalDBDummy } from '../db-example/local.db';
import { LocalFilter } from '../models/local-filter.model';
import { CarrierStateFilter } from '../models/carrier-state-filter.model';
import { CarrierRoute } from '../views/control-fleet/views/carrier-route/models/carrier-route.model';
import { CarrierList } from '../models/carrier-list.model';
import { ICarrierListRequest } from '@interfaces/control-tower/control-tower.interface';

@Injectable()
export class ControlTowerImplementService {
  constructor(private ctClientService: ControlTowerClientService) {}

  getCarrierStateList(): Observable<ISelectOption[]> {
    return this.ctClientService
      .getCarrierStateList()
      .pipe(
        map((stateList) =>
          stateList.map((state) => new CarrierStateFilter(state))
        )
      );
  }

  getLocalList(): Observable<LocalFilter[]> {
    return this.ctClientService
      .getLocalList()
      .pipe(
        map((localList) => localList.map((local) => new LocalFilter(local)))
      );
  }

  getCarrierList(req?: ICarrierListRequest): Observable<CarrierList> {
    return this.ctClientService
      .getCarrierList(req)
      .pipe(map((carrierList) => new CarrierList(carrierList)));
  }

  getDetailRoute(id: string) {
    return this.ctClientService
      .getDetailRoute(id)
      .pipe(map((carrierRoute) => new CarrierRoute(carrierRoute)));
  }
}
