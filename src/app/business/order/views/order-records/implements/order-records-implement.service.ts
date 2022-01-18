import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderClientService } from '@clients/order/order-client.service';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';
import { OrderRecords, OrderStatus } from '../interfaces/order-records.interface';

@Injectable()
export class OrderRecordsImplementService {

  get storeList(): Observable<IDrugstore[]> {
    return this.storesClient.getDrugstoreList();
  }

  get statusList(): Observable<OrderStatus[]> {
    return this.orderClient.getStatusList();
  }

  private filters = (multipleField: string, localId: string[], serviceChannel: string[], serviceTypeId: string[],
                     promiseDate: string[], orderStatus: string[], companyCode: string[]): {} => {

    const filter = {};

    if (multipleField?.length) { Object.assign(filter, {multipleField}); }
    if (localId?.length) { Object.assign(filter, {localId}); }
    if (serviceChannel?.length) { Object.assign(filter, {serviceChannel}); }
    if (serviceTypeId?.length) { Object.assign(filter, {serviceTypeId}); }
    if (promiseDate?.length) { Object.assign(filter, {promiseDate}); }
    if (orderStatus?.length) { Object.assign(filter, {orderStatus}); }
    if (companyCode?.length) { Object.assign(filter, {companyCode}); }

    return filter;
  }

  constructor(
    private orderClient: OrderClientService,
    private storesClient: DrugstoresClientService,
  ) {
  }

  orderList(page: number, pages: number = 10, multipleField: string = '', localId: string[] = null,
            serviceChannel: string[] = null, serviceTypeId: string[] = null, promiseDate: string[] = null,
            orderStatus: string[] = null, companyCode: string[] = null): Observable<OrderRecords> {
    return this.orderClient.getOrderList({
      filter: {
        ...this.filters(multipleField, localId, serviceChannel, serviceTypeId, promiseDate, orderStatus, companyCode)
      },
      page,
      records: pages
    });
  }
}
