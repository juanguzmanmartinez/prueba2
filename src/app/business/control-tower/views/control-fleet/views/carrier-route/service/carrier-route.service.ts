import { Injectable } from '@angular/core';
import { CarrierRouteStore } from '../store/carrier-route.store';
import { Observable } from 'rxjs';
import { CarrierRoute } from '../models/carrier-route.model';
import { OrderRoute } from '../models/order-route.model';
import { ControlTowerImplementService } from 'app/business/control-tower/implements/control-tower.implement.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CarrierRouteService {
  constructor(
    private crStore: CarrierRouteStore,
    private ctImplService: ControlTowerImplementService
  ) {}

  getDetailRoute(): Observable<Partial<CarrierRoute>> {
    return this.crStore.detailRoute$;
  }

  getOrderRouteList(): Observable<OrderRoute[]> {
    return this.crStore.orderRouteList$;
  }

  orderRouteListValue(): OrderRoute[] {
    return this.crStore.orderRouteListValue();
  }

  loadDetailRoute(motorizedId: string) {
    return this.ctImplService.getDetailRoute(motorizedId).pipe(
      tap((carrierRoute) => {
        const { orders, ...restCarrierRoute } = carrierRoute;
        this.crStore.setdetailRoute(restCarrierRoute);
        this.crStore.setOrderRouteList(orders);
      })
    );
  }
}
