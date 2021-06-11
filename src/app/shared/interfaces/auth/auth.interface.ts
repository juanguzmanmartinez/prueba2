export interface IAuthSignInRequest {
    username: string;
    password: string;
    grant_type?: string;
}

export interface IAuthRefreshTokenRequest {
    refresh_token: string;
    grant_type?: string;
}

export interface IAuthResponse {
    access_token: string;
    id: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    name: string;
    scope: string;
    first_last_name: string;
    second_last_name: string;
    email: string;
    jti: string;
    uuid: string;
}

export interface IAuthCodeRequest {
    email: string;
    code: string;
}

export interface IAuthRestorePasswordRequest {
    email: string;
    code: string;
    password: string;
}
