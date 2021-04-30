import { environment } from '@environments/environment';

export const CAuthCredentials = {
    username: environment.authUsername,
    password: environment.authPassword,
    grant_type_password: 'password',
    grant_type_refresh_token: 'refresh_token'
};
