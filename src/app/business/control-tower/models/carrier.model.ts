import { ICarrierResponse } from '@interfaces/control-tower/control-tower.interface';

export class Carrier {
  idCarrier: string;
  local: string;
  carrier: string;
  provider: string;
  startHour: string;
  state: string;
  paused: string;
  constructor(res: ICarrierResponse) {
    this.idCarrier = res.motorizedId;
    this.local = res.localFullName;
    this.carrier = res.nameMotorized;
    this.provider = res.supplier;
    this.startHour = res.entryTime;
    this.state = res.state;
    this.paused = res.slow;
  }
}
