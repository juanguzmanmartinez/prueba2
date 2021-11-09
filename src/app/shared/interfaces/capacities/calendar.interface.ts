import { isObject } from '@helpers/objects-equal.helper';

export interface IBlocked {
    day: string;
    check: boolean;
}

export class Blocked {
    public day: string;
    public check: boolean;

    constructor(store: IBlocked) {
        const currentValue = isObject(store) ? store : {} as IBlocked;
        this.day = currentValue.day || '';
        this.check = currentValue.check || false;
    }

}
