import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import {
  ICarrierStateResponse,
  ILocalResponse,
} from '@interfaces/control-tower/control-tower.interface';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { Observable } from 'rxjs';

@Injectable()
export class ControlTowerClientService {
  private readonly CT_CARRIER_STATE_LIST =
    EndpointsParameter.CT_CARRIER_STATE_LIST;
  private readonly CT_LOCAL_LIST = EndpointsParameter.CT_LOCAL_LIST;

  constructor(private genericService: GenericService) {}

  getCarrierStateList(): Observable<ICarrierStateResponse[]> {
    const endpoint = this.CT_CARRIER_STATE_LIST;
    return this.genericService.genericGet<ICarrierStateResponse[]>(endpoint);
  }

  getLocalList(): Observable<ILocalResponse[]> {
    const endpoint = this.CT_LOCAL_LIST;
    return this.genericService.genericGet<ILocalResponse[]>(endpoint);
  }
}
