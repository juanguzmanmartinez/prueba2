import {isObject} from '../../helpers/objects-equal';

export interface ILocalGroup {
  description: string;
  localCode: string;
  position: number;
  wmsEnabled: boolean;
}

export class LocalGroup {
  description: string;
  localCode: string;
  position: number;
  wmsEnabled: boolean;

  constructor(iLocalGroup: ILocalGroup) {
    const localGroup = isObject(iLocalGroup) ? iLocalGroup : {} as ILocalGroup;
    this.description = localGroup.description || '';
    this.localCode = localGroup.localCode || '';
    this.position = localGroup.position || 0;
    this.wmsEnabled = localGroup.wmsEnabled || false;
  }
}
