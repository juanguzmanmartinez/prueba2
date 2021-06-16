import { IRegisteredUser } from '@interfaces/users/users.interface';
import { EState } from '@models/state/state.model';
import { UserPermissions } from '@models/auth/permissions.model';

export class RegisteredUser {
    id: string;
    name: string;
    lastname: string;
    email: string;
    position: string;
    state: EState;
    permissionList: UserPermissions[];

    constructor(iRegisteredUser: IRegisteredUser) {
        this.id = iRegisteredUser.id;
        this.name = iRegisteredUser.name;
        this.lastname = iRegisteredUser.lastname;
        this.email = iRegisteredUser.email;
        this.position = iRegisteredUser.position;
        this.state = iRegisteredUser.enabled ? EState.active : EState.inactive;
        this.permissionList = iRegisteredUser.permissions ? iRegisteredUser.permissions
            .map((permissions) => new UserPermissions(permissions)) : [];
    }

}
