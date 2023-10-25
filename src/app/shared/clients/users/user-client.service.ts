import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { IRegisteredUser } from '@interfaces/users/users.interface';

@Injectable()
export class UserClientService {
    private readonly USERS_LIST = EndpointsParameter.USER_LIST;


    constructor(
        private generic: GenericService,
    ) {
    }

    public getUserList(): Observable<IRegisteredUser[]> {
        return this.generic.genericGet<IRegisteredUser[]>(this.USERS_LIST)
            .pipe(
                take(1),
                map((response: IRegisteredUser[]) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getUser(userId: string): Observable<IRegisteredUser> {
        return this.getUserList()
            .pipe(
                take(1),
                map((iUserList: IRegisteredUser[]) => {
                    const findUser = iUserList.find((store) => store.id === userId);
                    if (!findUser) {
                        throw new Error('User not found');
                    }
                    return findUser;
                }),
                map((response: IRegisteredUser) => {
                    return isObject(response) ? response : null;
                }));
    }
}
