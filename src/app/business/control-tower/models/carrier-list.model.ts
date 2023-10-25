import {
  ICarrierListResponse,
  IPagination,
} from '@interfaces/control-tower/control-tower.interface';
import { Carrier } from './carrier.model';

export class CarrierList {
  carriers: Carrier[];
  pagination: IPagination;

  constructor(res: ICarrierListResponse) {
    this.carriers = res.motorizeds.map((motorized) => new Carrier(motorized));
    this.pagination = res.pagination;
  }
}
