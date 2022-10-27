import { IExpressIntervalTimeResponse } from '@interfaces/capacities/interval-time.interface';

export class ExpressIntervalTime {
  localCode: string;
  serviceType: string;
  enabled: boolean;
  baseLineCapacity: number;
  baseLineIntervalTime: number;
  consumptionMax: number;
  addCapacity: number;
  addIntervalTime: number;
  laps: number;

  constructor(res: IExpressIntervalTimeResponse) {
    this.localCode = res.data.localCode;
    this.serviceType = res.data.serviceType;
    this.enabled = res.data.enabled;
    this.baseLineCapacity = res.data.baseLineCapacity;
    this.baseLineIntervalTime = res.data.baseLineIntervalTime;
    this.consumptionMax = res.data.consumptionMax || 0;
    this.addCapacity = res.data.addCapacity || 0;
    this.addIntervalTime = res.data.addIntervalTime || 0;
    this.laps = res.data.laps || 0;
  }
}
