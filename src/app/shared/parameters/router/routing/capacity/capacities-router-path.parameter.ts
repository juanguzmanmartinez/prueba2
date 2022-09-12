import {
  CAPACITIES_ROUTER,
  CP_CHILDREN_PATH,
  INTERVAL_CHILDREN_PATH,
  REPORTS_CHILDREN_PATH,
} from '@parameters/router/routing/capacity/capacities-router.parameter';

export const CAPACITIES_ROUTER_PATH = {
  capacity: `/${CAPACITIES_ROUTER.path}`,
  capacitiesPath: `/${CAPACITIES_ROUTER.path}/${CP_CHILDREN_PATH.records}`,
  intervalPath: `/${CAPACITIES_ROUTER.path}/${INTERVAL_CHILDREN_PATH.records}`,
  reportPath: `/${CAPACITIES_ROUTER.path}/${REPORTS_CHILDREN_PATH.records}`,

  orderDetail: (orderCode = 'orderCode') =>
    `/${CAPACITIES_ROUTER.path}/${CP_CHILDREN_PATH.detail}/${orderCode}`,
};
