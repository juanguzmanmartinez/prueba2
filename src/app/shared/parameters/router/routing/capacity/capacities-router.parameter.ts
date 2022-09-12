import { TRouter } from '@models/auth/router.model';

export const CAPACITIES_ROUTER: TRouter = {
  path: 'operaciones',
  name: 'Zonas',
  iconCard: 'dump',
  iconMenu: 'local_mall',
  description: 'Consulta de pedidos',
};

export const CP_CHILDREN_PATH = {
  records: 'capacidades',
  detail: 'detalle',
  orderCode: 'orderCode',
};
export const INTERVAL_CHILDREN_PATH = {
  records: 'capacidades/intervaltime',
  detail: 'detalle',
  orderCode: 'orderCode',
};
export const REPORTS_CHILDREN_PATH = {
  records: 'capacidades/reportes',
  detail: 'detalle',
  orderCode: 'orderCode',
};
