import { TRouter } from '@models/auth/router.model';

export const CT_ROUTER: TRouter = {
  path: 'torre-de-control',
  name: 'Torre',
  iconCard: 'dump',
  iconMenu: 'local_mall',
  description: 'Torre de control',
};

export const CT_CHILDREN_PATH = {
  fleet: 'flota',
  routes: 'rutas',
};
