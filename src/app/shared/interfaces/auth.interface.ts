export interface IAuthRequest {
    username: string;
    password: string;
    grant_type?: string;
}
export interface IAuthResponse {
    access_token: string;
    token_type: string;
    refresh_type: string;
    expires_in: number;
    scopes: string;
    name: string;
    first_last_name: string;
    second_last_name: string;
    email: string;
    jti: string;
}
