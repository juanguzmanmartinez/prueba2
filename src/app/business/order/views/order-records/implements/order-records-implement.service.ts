import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderClientService } from '@clients/order/order-client.service';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';
import {
  OrderRecords,
  OrderStatus,
} from '../interfaces/order-records.interface';
import { IOrderFilters } from '../interfaces/order-filter.interface';

@Injectable()
export class OrderRecordsImplementService {
  get storeList(): Observable<IDrugstore[]> {
    return this.storesClient.getDrugstoreList();
  }

  get statusList(): Observable<OrderStatus[]> {
    return this.orderClient.getStatusList();
  }

  private filters = ({
    searchCode,
    searchValue,
    localId,
    serviceChannel,
    serviceTypeId,
    promiseDate,
    orderStatus,
    companyCode,
  }: IOrderFilters): {} => {
    const filters = {};

    if (searchValue?.length) {
      Object.assign(filters, {
        filterType: searchCode,
        valueFilterType: searchValue,
      });
    }
    if (localId?.length) {
      Object.assign(filters, { localId });
    }
    if (serviceChannel?.length) {
      Object.assign(filters, { serviceChannel });
    }
    if (serviceTypeId?.length) {
      Object.assign(filters, { serviceTypeId });
    }
    if (promiseDate) {
      Object.assign(filters, { promiseDate });
    }
    if (orderStatus?.length) {
      Object.assign(filters, { orderStatus });
    }
    if (companyCode?.length) {
      Object.assign(filters, { companyCode });
    }

    return filters;
  };

  private orderCriteria = (data: {
    column: string;
    order: 'A' | 'D' | 'N';
  }): {} => {
    const detailCriteria = {};

    if (data?.order !== 'N' && data?.column.length) {
      Object.assign(detailCriteria, {
        column: data?.column,
        order: data?.order,
      });
    }

    return detailCriteria;
  };

  constructor(
    private orderClient: OrderClientService,
    private storesClient: DrugstoresClientService
  ) {}

  orderList(
    page: number,
    pages: number = 10,
    orderFilters: IOrderFilters,
    dataCriteria: { column: string; order: 'A' | 'D' | 'N' } | null = null
  ): Observable<OrderRecords> {
    const body = {
      page,
      records: pages,
    };

    const filters = this.filters(orderFilters);

    const orderCriteria = this.orderCriteria(dataCriteria);

    if (Object.keys(filters).length) {
      Object.assign(body, { filter: filters });
    }

    if (Object.keys(orderCriteria).length) {
      Object.assign(body, { orderCriteria });
    }

    return this.orderClient.getOrderList(body);
  }
}
