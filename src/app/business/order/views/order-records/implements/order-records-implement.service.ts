import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderClientService } from '@clients/order/order-client.service';
import { OrderModel } from '../models/order-records.model';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';

@Injectable()
export class OrderRecordsImplementService {

  get storeList(): Observable<IDrugstore[]> {
    return this.storesClient.getDrugstoreList();
  }

  private addFilters = (url: string, id: string, dateInit: string, dateEnd: string,
                        status: string, localCode: Array<string>): string => {

    if (id) { url = url + `&id=${id}`; }
    if (dateInit) { url = url + `&dateInit=${dateInit}`; }
    if (dateEnd) { url = url + `&dateEnd=${dateEnd}`; }
    if (status) { url = url + `&status=${status}`; }
    if (localCode.length) { url = url + `&localCode=${localCode}`; }

    return url;
  }

  constructor(
    private orderClient: OrderClientService,
    private storesClient: DrugstoresClientService,
  ) { }

  orderList(page: number, pages: number = 10): Observable<OrderModel[]> {
    const apiURL = `?page=${page}&size=${pages}`;
    return this.orderClient.getOrderList('');
  }
}
