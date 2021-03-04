import { IStore } from '@interfaces/stores/stores.interface';

export class ZonesStore {
    name: string;
    code: string;

    constructor(iStore: IStore) {
        this.code = iStore.localCode || null;
        this.name = iStore.name || null;
    }
}
