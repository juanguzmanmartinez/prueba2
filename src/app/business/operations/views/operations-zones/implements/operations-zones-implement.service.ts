import { Injectable } from '@angular/core';
import { ZONES_LIST } from '../modals/operation-zones-responses.modal';

@Injectable()
export class OperationsZonesImplementService {
    constructor() {
    }

    getLocalById(storeId: string) {
        return ZONES_LIST.find((store) => store.code === storeId);
    }
}
