import { CT_CHILDREN_PATH, CT_ROUTER } from './control-tower-router.parameter';

export const CT_ROUTER_PATH = {
  controlTower: `/${CT_ROUTER.path}`,
  ctControlFleet: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.fleet}`,
  ctCarriers: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.fleet}/${CT_CHILDREN_PATH.carriers}`,
  ctCarrierRoute: (idCarrier: string = 'idCarrier') =>
    `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.fleet}/${CT_CHILDREN_PATH.carrierRoute}/${idCarrier}`,
  ctRouteMonitoring: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.routes}`,
};
