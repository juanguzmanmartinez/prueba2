import { IStore } from '@interfaces/stores/stores.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

export class ZonesStore {
    name: string;
    code: string;
    startHour: number;
    endHour: number;

    constructor(iStore: IStore) {
        this.code = iStore.localCode || null;
        this.name = iStore.name || null;
        this.startHour = DatesHelper.date(iStore.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.endHour = DatesHelper.date(iStore.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
    }
}
