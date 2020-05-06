import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { isArray } from '../../helpers/objects-equal';
import { IStore, IStoreResponse, Store } from './calendar.model';
import { GenericService } from '../generic.service';


@Injectable()
export class CalendarClientService {

  private readonly STORE_ENDPOINT = ENDPOINTS.GET_STORE;

  constructor(
    private genericService: GenericService,
  ) { }

  public getStoreClient$(): Observable<IStore[]> {
    const httpParams = new HttpParams();
    const Header = new HttpHeaders();
    return this.genericService.genericGet<IStoreResponse>(this.STORE_ENDPOINT, httpParams, Header)
      .pipe(map(response => {
        const scheduleItems = isArray(response) ? response.elements : [];
        return scheduleItems.map(item => new Store(item));
      }));
  }
}
