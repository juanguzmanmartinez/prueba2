import { TRouter } from '@models/auth/router.model';

export const CT_ROUTER: TRouter = {
  path: 'torre-de-control',
  name: 'Torre de control',
  iconCard: 'dump',
  iconMenu: 'local_mall',
  description: 'Torre de control',
};

export const CT_CHILDREN_PATH = {
  fleet: 'flota',
  carriers: 'transportistas',
  carrierRoute: 'ruta-del-transportista',
  idCarrier: 'idCarrier',
  routes: 'rutas',
  routeTracking: 'seguimiento-de-rutas',
  allocationRouting: 'asignacion-y-ruteo',
  manualRouting: 'asignacion-manual',
  idLocal: 'idLocal',
};
