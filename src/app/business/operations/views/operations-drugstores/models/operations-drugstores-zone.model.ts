import { IDrugstoreZone } from '@interfaces/drugstores/drugstores.interface';

export class DrugstoreZone {
  code: string;
  name: string;
  backupZone: string;
  backupAssignedStore: string;

  constructor(iDrugstoreZone: IDrugstoreZone) {
    this.code = iDrugstoreZone.idZone || null;
    this.name = iDrugstoreZone.name || null;
    this.backupZone = iDrugstoreZone.backupZone || null;
    this.backupAssignedStore = iDrugstoreZone.backupAssignedStore || null;
  }
}
