import { TRouter } from '@models/auth/router.model';

export const ORDER_ROUTER: TRouter = {
  path: 'pedidos',
  name: 'Order',
  iconCard: 'dump',
  iconMenu: 'store',
  description: 'Consulta de pedidos'
};

export const OR_CHILDREN_PATH = {
  records: 'registros',
  detail: 'detalle',
  orderCode: 'orderCode'
};
