import { AC_CHILDREN_PATH, ACCOUNT_ROUTER } from '@parameters/router/routing/account/account-router.parameter';

export const ACCOUNT_ROUTER_PATH = {
    accountLogin: `/${ACCOUNT_ROUTER.path}/${AC_CHILDREN_PATH.login}`,
    acctRecoverPassword: `/${ACCOUNT_ROUTER.path}/${AC_CHILDREN_PATH.recoverPassword}`,
    acctRecoverPasswordReset: `/${ACCOUNT_ROUTER.path}/${AC_CHILDREN_PATH.recoverPassword}/${AC_CHILDREN_PATH.recoverPasswordReset}`,
    acctRecoverPasswordUser: `/${ACCOUNT_ROUTER.path}/${AC_CHILDREN_PATH.recoverPassword}/${AC_CHILDREN_PATH.recoverPasswordUser}`,
    acctRecoverPasswordCode: `/${ACCOUNT_ROUTER.path}/${AC_CHILDREN_PATH.recoverPassword}/${AC_CHILDREN_PATH.recoverPasswordCode}`,
};
