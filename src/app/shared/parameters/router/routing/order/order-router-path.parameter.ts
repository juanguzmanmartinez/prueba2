import { OR_CHILDREN_PATH, ORDER_ROUTER } from '@parameters/router/routing/order/order-router.parameter';

export const ORDER_ROUTER_PATH = {
  order: `/${ORDER_ROUTER.path}`,
  orderRecords: `/${ORDER_ROUTER.path}/${OR_CHILDREN_PATH.records}`,
  orderDetail: (orderCode = 'orderCode') =>
    `/${ORDER_ROUTER.path}/${OR_CHILDREN_PATH.detail}/${orderCode}`
};
