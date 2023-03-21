import { CT_CHILDREN_PATH, CT_ROUTER } from './control-tower-router.parameter';

export const CT_ROUTER_PATH = {
  controlTower: `/${CT_ROUTER.path}`,
  ctControlFleet: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.fleet}`,
  ctRouteMonitoring: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.routes}`,
};
