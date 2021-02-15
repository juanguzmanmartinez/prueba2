import { environment } from '@environments/environment';

export const CAuthCredentials = {
    username: environment.authUsername,
    password: environment.authPassword,
    grant_type: 'password'
};
