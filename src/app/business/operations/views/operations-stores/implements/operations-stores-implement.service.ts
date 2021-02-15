import { Injectable } from '@angular/core';
import { STORES_LIST } from '../modals/operation-stores-responses.modal';

@Injectable()
export class OperationsStoresImplementService {
    constructor() {
    }

    getLocalById(storeId: string) {
        return STORES_LIST.find((store) => store.store === storeId);
    }
}
