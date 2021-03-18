import * as jwt_decode from 'jwt-decode';

export function JwtDecodeToken<T>(token: string): T {
    return jwt_decode.default<T>(token);
}
