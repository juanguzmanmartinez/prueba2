import {
  ZN_CHILDREN_PATH,
  ZONES_ROUTER,
} from '@parameters/router/routing/zones/zones-router.parameter';

export const ZONES_ROUTER_PATH = {
  zone: `/${ZONES_ROUTER.path}`,
  zonesPath: `/${ZONES_ROUTER.path}/${ZN_CHILDREN_PATH.records}`,
  orderDetail: (orderCode = 'orderCode') =>
    `/${ZONES_ROUTER.path}/${ZN_CHILDREN_PATH.detail}/${orderCode}`,
};
