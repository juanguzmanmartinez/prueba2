import { TRouter } from '@models/auth/router.model';

export const ORDER_ROUTER: TRouter = {
  path: 'pedidos',
  name: 'Pedidos',
  iconCard: 'dump',
  iconMenu: 'local_mall',
  description: 'Consulta de pedidos',
  clickable: false
};

export const OR_CHILDREN_PATH = {
  records: 'registros',
  detail: 'detalle',
  orderCode: 'orderCode'
};
