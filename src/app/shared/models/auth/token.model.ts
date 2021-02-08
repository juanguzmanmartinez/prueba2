import { ITokenDetail } from '@interfaces/auth/token.interface';
import { DatesHelper } from '@helpers/dates.helper';

export class TokenDetail {
    jti: string;
    clientId: string;
    expirationDate: number;

    constructor(iTokenDetail: ITokenDetail) {
        this.jti = iTokenDetail.jti;
        this.clientId = iTokenDetail.client_id;
        this.expirationDate = DatesHelper.date.unix(iTokenDetail.exp).valueOf();
    }
}
