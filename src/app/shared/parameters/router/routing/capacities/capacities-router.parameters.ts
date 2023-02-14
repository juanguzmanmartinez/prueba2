import { TRouter } from '@models/auth/router.model';
import { DELIVERY_SERVICE_TYPE_PATH } from '../shared/shared-router.parameter';

export const CAPACITIES_ROUTER: TRouter = {
  path: 'capacidades',
  name: 'Capacidades',
  iconCard: 'dump',
  iconMenu: 'local_mall',
  description: 'Consulta de capacidades',
};

export const CAPACITIES_CHILDREN_PATH = {
  serviceType: 'despachos',
  configuration: 'configuracion',
  base: 'base',
  intervalTime: 'interval-time',
  windowTime: 'ventanas-horarias',
  capacityAmPm: DELIVERY_SERVICE_TYPE_PATH.deliveryAmPm,
  capacityScheduled: DELIVERY_SERVICE_TYPE_PATH.deliveryScheduled,
  capacityExpress: DELIVERY_SERVICE_TYPE_PATH.deliveryExpress,
  capacityRet: DELIVERY_SERVICE_TYPE_PATH.deliveryRet,
  capacityReport: 'reportes',
};
