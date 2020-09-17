import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { isArray, isObject } from '../../helpers/objects-equal';
import { GenericService } from '../generic.service';
import { ILocal, Local } from '../models/local.model';
import { ITypeService, TypeService } from '../models/type-service.model';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { of } from 'rxjs';
import { IGlobalSuccessfulResponse } from '../models/client-services.interface';

export interface IGenericResponse {
  [key: string]: string | number | IGenericResponse;
}

@Injectable()
export class LocalClientService {

  private readonly LOCAL_ENDPOINT = ENDPOINTS.GET_LOCAL;
  private readonly TYPE_SERVICE_ENDPOINT = ENDPOINTS.GET_TYPESERVICE;

  constructor(
    private genericService: GenericService,
  ) { }

  public getLocalClient$(serviceType: string) {
    const httpParams = new HttpParams();
    const Header = new HttpHeaders();
    const endpoint = this.LOCAL_ENDPOINT + serviceType;
    return this.genericService.genericGet<ILocal[]>(endpoint, httpParams, Header)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        const locales = current.map(store => new Local(store));
        return locales;
      }));
  }

  public getTypeOperationClient$(serviceType: string, selectedLocal: ICustomSelectOption, serviceTypeCode: string) {
    const httpParams = new HttpParams()
      .set('fulfillmentCenterCode', String(selectedLocal.fulfillmentCenterCode)) // selectedLocal.fulfillmentCenterCode
      .set('channel', String('DIGITAL'))
      .set('serviceTypeCode', String(serviceTypeCode))
      .set('detailType', String(serviceType));
    const Header = new HttpHeaders();
    return this.genericService.genericGet<ITypeService>(this.TYPE_SERVICE_ENDPOINT, httpParams, Header)
      .pipe(map(response => {
        const service = isObject(response) ? response : [];
        return service;
      })).pipe(catchError((response: HttpErrorResponse) => {
        return of({
          data: {},
          status: response.status,
        } as IGlobalSuccessfulResponse<IGenericResponse>);
      }));
  }
}
