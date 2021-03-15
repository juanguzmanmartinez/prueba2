import { IZone } from '@interfaces/zones/zones.interface';

export class StoresZone {
    code: string;
    name: string;

    constructor(iZone: IZone) {
        this.code = iZone.idZone || null;
        this.name = iZone.name || null;
    }
}
