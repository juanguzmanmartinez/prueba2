import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ENDPOINTS } from '../../parameters/endpoints';
import { isArray } from '../../helpers/objects-equal';
import { IStoreResponse, IDrugstore, Drugstore } from '../models/drugstore.model';
import { GenericService } from '../generic.service';


@Injectable()
export class DrugstoreClientService {

  private readonly DRUGSTORE_ENDPOINT = ENDPOINTS.GET_DRUGSTORE;

  constructor(
    private genericService: GenericService,
  ) { }

  public getDrugstoreClient$() {
    const httpParams = new HttpParams();
    const Header = new HttpHeaders();
    return this.genericService.genericGet<IDrugstore[]>(this.DRUGSTORE_ENDPOINT, httpParams, Header)
      .pipe(map(response => {
        const current = isArray(response) ? response : [];
        const drugstores = current.map(store => new Drugstore(store));
        return drugstores;
      }));
  }
}
