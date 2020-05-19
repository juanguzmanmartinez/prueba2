import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { GenericService } from '../generic.service';
import { isArray } from '../../helpers/objects-equal';
import { ICapacityRequestParams, ICapacity, Capacity } from '../models/capacity.model';


@Injectable()

export class CapacityClientService {

  private readonly BLOCKSCHEDULE_ENDPOINT = ENDPOINTS.GET_BLOCKSCHEDULE;

  constructor(
    private genericService: GenericService,
  ) { }

  public getBlockScheduleClient$(params: ICapacityRequestParams) {
    const httpParams = new HttpParams()
      .set('segmentType', String(params.segmentType))
      .set('day', String(params.day))
      .set('fulfillmentCenterCode', String(params.fulfillmentCenterCode))
      .set('channel', String(params.channel));
    const Header = new HttpHeaders();
    return this.genericService.genericGet<ICapacity[]>(this.BLOCKSCHEDULE_ENDPOINT, httpParams, Header)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        const responses = current.map(e => new Capacity(e));
        return responses;
      }));
  }
}
