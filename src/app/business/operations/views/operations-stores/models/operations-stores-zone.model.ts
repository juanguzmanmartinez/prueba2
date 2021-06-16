import { IDrugstoreZone } from '@interfaces/drugstores/drugstores.interface';

export class StoresZone {
    code: string;
    name: string;
    backupZone: string;
    backupAssignedStore: string;

    constructor(iZone: IDrugstoreZone) {
        this.code = iZone.idZone || null;
        this.name = iZone.name || null;
        this.backupZone = iZone.backupZone || null;
        this.backupAssignedStore = iZone.backupAssignedStore || null;
    }
}
