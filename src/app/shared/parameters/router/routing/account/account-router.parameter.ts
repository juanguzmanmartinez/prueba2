import { TRouter } from '@models/auth/router.model';

export const ACCOUNT_ROUTER: TRouter = {
    path: 'cuenta'
};

export const AC_CHILDREN_PATH = {
    login: 'iniciar-sesion',
    recoverPassword: 'recuperar-contrasena',
    recoverPasswordReset: 'contrasena',
    recoverPasswordUser: 'usuario',
    recoverPasswordCode: 'codigo',
};
