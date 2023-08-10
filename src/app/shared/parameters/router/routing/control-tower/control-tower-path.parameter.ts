import { CT_CHILDREN_PATH, CT_ROUTER } from './control-tower-router.parameter';

export const CT_ROUTER_PATH = {
  controlTower: `/${CT_ROUTER.path}`,
  ctControlFleet: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.fleet}`,
  ctCarriers: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.fleet}/${CT_CHILDREN_PATH.carriers}`,
  ctCarrierRoute: (idCarrier: string = 'idCarrier') =>
    `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.fleet}/${CT_CHILDREN_PATH.carriers}/${CT_CHILDREN_PATH.carrierRoute}/${idCarrier}`,
  ctRouteMonitoring: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.routes}`,
  ctRouteTracking: `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.routes}/${CT_CHILDREN_PATH.routeTracking}`,
  ctAllocationRouting: (idLocal: string = 'idLocal') =>
    `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.routes}/${CT_CHILDREN_PATH.allocationRouting}/${idLocal}`,
  ctManualRouting: (idLocal: string = 'idLocal') =>
    `/${CT_ROUTER.path}/${CT_CHILDREN_PATH.routes}/${CT_CHILDREN_PATH.manualRouting}/${idLocal}`,
};
