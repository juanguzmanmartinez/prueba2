import { Injectable } from '@angular/core';
import { STORES_LIST } from '../models/operation-stores-responses.model';

@Injectable()
export class OperationsStoresImplementService {
    constructor() {
    }

    getLocalById(storeId: string) {
        return STORES_LIST.find((store) => store.store === storeId);
    }
}
