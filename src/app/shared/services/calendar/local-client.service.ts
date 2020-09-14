import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { isArray } from '../../helpers/objects-equal';
import { GenericService } from '../generic.service';
import { ILocal, Local } from '../models/local.model';


@Injectable()
export class LocalClientService {

  private readonly LOCAL_ENDPOINT = ENDPOINTS.GET_LOCAL;

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
}
