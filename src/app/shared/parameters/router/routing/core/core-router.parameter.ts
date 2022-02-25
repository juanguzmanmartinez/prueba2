import { TRouter } from '@models/auth/router.model';

export const CORE_ROUTER: { [key: string]: TRouter } = {
  base: {
    path: '',
    name: 'Farmacias Peruanas'
  },
  notFound: {
    path: 'no-encontrado',
    name: 'Página no encontrada'
  },
  notInternetConnection: {
    path: 'sin-internet',
    name: 'Sin conexión a internet'
  },
  wildcard: {
    path: '**'
  },
};
