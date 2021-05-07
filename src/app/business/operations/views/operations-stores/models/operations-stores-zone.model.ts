import { IStoreZone } from '@interfaces/stores/stores.interface';

export class StoresZone {
    code: string;
    name: string;
    backupZone: string;
    backupAssignedStore: string;

    constructor(iZone: IStoreZone) {
        this.code = iZone.idZone || null;
        this.name = iZone.name || null;
        this.backupZone = iZone.backupZone || null;
        this.backupAssignedStore = iZone.backupAssignedStore || null;
    }
}
