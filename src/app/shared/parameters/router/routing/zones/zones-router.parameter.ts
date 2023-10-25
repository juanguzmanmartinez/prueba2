import { TRouter } from '@models/auth/router.model';

export const ZONES_ROUTER: TRouter = {
  path: 'operaciones',
  name: 'Zonas',
  iconCard: 'dump',
  iconMenu: 'local_mall',
  description: 'Consulta de pedidos',
};

export const ZN_CHILDREN_PATH = {
  records: 'zonas',
  detail: 'detalle',
  orderCode: 'orderCode',
};
