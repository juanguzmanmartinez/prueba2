import { ICarrierResponse } from '@interfaces/control-tower/control-tower.interface';
import { formatDay, formatHour } from '../util/format-dates.function';

export class Carrier {
  idCarrier: string;
  local: string;
  localName: string;
  carrier: string;
  provider: string;
  startHour: string;
  state: string;
  paused: string;
  isPendingRoute: boolean;
  numberOfRoutes: number;

  constructor(res: ICarrierResponse) {
    this.idCarrier = res.motorizedId || '-';
    this.local = res.localFullName || '-';
    this.localName = this.getlocalName(res.localFullName);
    this.carrier = res.nameMotorized || '-';
    this.provider = res.supplier || '-';
    this.startHour = res.entryTime || '-';
    this.state = res?.stateDescription || '-';
    this.paused = res.slow || '-';
    this.isPendingRoute = !!res.pendingRoute;
    this.numberOfRoutes = res.counterRouter;
  }

  formatDate(orderDate: string) {
    const splitted = orderDate.split(' ');
    const dateFormat = formatDay(splitted[0]);
    const hourFormat = formatHour(splitted[1]);
    return `${dateFormat} ${hourFormat}`;
  }

  formatPausedDate(paused: string) {
    if (paused.toLowerCase() === 'no') return 'No';
    const splitted = paused.split(' ');
    const dateFormat = formatDay(splitted[0]);
    const hourFormat = formatHour(splitted[1]);
    return `Desde ${dateFormat} ${hourFormat}`;
  }

  getlocalName(fullLocalName: string) {
    if (!fullLocalName) return '-';
    return fullLocalName.split('-')[1];
  }
}
