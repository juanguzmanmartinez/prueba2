import { Injectable } from '@angular/core';
import { UserClientService } from '@clients/users/user-client.service';
import { RegisteredUser } from '../models/users.model';
import { map } from 'rxjs/operators';
import { IRegisteredUser } from '@interfaces/users/users.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AdministratorUsersImplementService {
    constructor(
        private _userClient: UserClientService
    ) {
    }

    get userList(): Observable<RegisteredUser[]> {
        return this._userClient.getUserList()
            .pipe(
                map((iRegisteredUserList: IRegisteredUser[]) => {
                    return iRegisteredUserList?.length ? iRegisteredUserList
                        .map(iRegisteredUser => new RegisteredUser(iRegisteredUser)) : [];
                })
            );
    }

}
