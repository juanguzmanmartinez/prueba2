import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import {
  ICarrierListRequest,
  ICarrierListResponse,
  ICarrierResponse,
  ICarrierStateResponse,
  IDetailRouteResponse,
  ILocalResponse,
} from '@interfaces/control-tower/control-tower.interface';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { Observable } from 'rxjs';

@Injectable()
export class ControlTowerClientService {
  private readonly CT_CARRIER_STATE_LIST =
    EndpointsParameter.CT_CARRIER_STATE_LIST;
  private readonly CT_LOCAL_LIST = EndpointsParameter.CT_LOCAL_LIST;
  private readonly CT_CARRIER_LIST = EndpointsParameter.CT_CARRIER_LIST;
  private readonly CT_DETAIL_ROUTE = EndpointsParameter.CT_DETAIL_ROUTE;

  constructor(private genericService: GenericService) {}

  getCarrierStateList(): Observable<ICarrierStateResponse[]> {
    const endpoint = this.CT_CARRIER_STATE_LIST;
    return this.genericService.genericGet<ICarrierStateResponse[]>(endpoint);
  }

  getLocalList(): Observable<ILocalResponse[]> {
    const endpoint = this.CT_LOCAL_LIST;
    return this.genericService.genericGet<ILocalResponse[]>(endpoint);
  }

  getCarrierList(
    request?: ICarrierListRequest
  ): Observable<ICarrierListResponse> {
    const endpoint = this.CT_CARRIER_LIST;
    let params = new HttpParams();
    if (request) {
      const { locals, states, page, orderBy, orderType } = request;
      if (locals) params = params.set('locals', locals);
      if (states) params = params.set('states', states);
      if (page) params = params.set('page', String(page));
      if (orderBy) params = params.set('orderBy', orderBy);
      if (orderType) params = params.set('orderType', orderType);
    }
    return this.genericService.genericGet<ICarrierListResponse>(
      endpoint,
      params
    );
  }

  getDetailRoute(id: string): Observable<IDetailRouteResponse> {
    const endpoint = `${this.CT_DETAIL_ROUTE}/${id}`;
    return this.genericService.genericGet<IDetailRouteResponse>(endpoint);
  }
}
