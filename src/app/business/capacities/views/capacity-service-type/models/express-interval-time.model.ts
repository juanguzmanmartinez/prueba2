import { IExpressIntervalTimeResponse } from '@interfaces/capacities/interval-time.interface';

export class ExpressIntervalTime {
  localCode: string;
  serviceType: string;
  enabled: boolean;
  baseLineCapacity: number;
  baseLineIntervalTime: number;
  consumptionMax: number | '';
  addCapacity: number | '';
  addIntervalTime: number | '';
  laps: number | '';
  isEditionState: boolean;

  constructor(res: IExpressIntervalTimeResponse) {
    this.localCode = res.data.localCode;
    this.serviceType = res.data.serviceType;
    this.enabled = res.data.enabled;
    this.baseLineCapacity = res.data.baseLineCapacity;
    this.baseLineIntervalTime = res.data.baseLineIntervalTime;
    this.consumptionMax = res.data.consumptionMax || '';
    this.addCapacity = res.data.addCapacity || '';
    this.addIntervalTime = res.data.addIntervalTime || '';
    this.laps = res.data.laps || '';
    this.isEditionState = this.getEditionState(
      res.data.consumptionMax,
      res.data.addCapacity,
      res.data.addIntervalTime,
      res.data.laps
    );
  }

  getEditionState(consumptionMax, addCapacity, addIntervalTime, laps) {
    if (consumptionMax && addCapacity && addIntervalTime && laps) {
      return true;
    }
    return false;
  }
}
