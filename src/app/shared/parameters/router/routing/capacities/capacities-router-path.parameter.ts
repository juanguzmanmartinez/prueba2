import {
  CAPACITIES_ROUTER,
  CAPACITIES_CHILDREN_PATH,
} from './capacities-router.parameters';

export const CAPACITIES_MODULE_ROUTER_PATH = {
  capacities: `/${CAPACITIES_ROUTER.path}`,
  capacitiesServiceType: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}`,
  capacitiesConfigurationBase: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.base}`,
  capacitiesConfigurationIntervalTime: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.intervalTime}`,
  capacitiesConfigurationWindowsTime: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.windowTime}`,
  capacitiesAmPm: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.capacityAmPm}`,
  capacitiesScheduled: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.capacityScheduled}`,
  capacitiesExpress: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.capacityExpress}`,
  capacitiesRet: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.capacityRet}`,
  capacityReport: `/${CAPACITIES_ROUTER.path}/${CAPACITIES_CHILDREN_PATH.serviceType}/${CAPACITIES_CHILDREN_PATH.capacityReport}`,
  
};
