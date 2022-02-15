import { TBasePermissions, TPathPermissions } from '@models/auth/permissions.model';
import { Access } from '@parameters/auth/access.parameter';

export function permissions(parentModule: TBasePermissions, childrenModules: TBasePermissions): TPathPermissions {
    let childrenAccess: Access[] = [];
    Object.entries(childrenModules)
        .forEach(([, [, access]]) => childrenAccess = [...childrenAccess, access]);
    const parentPath = Object.keys(parentModule)[0];
    const [parentRoles, parentAccess] = parentModule[parentPath];
    const parentPermission: TPathPermissions = {
        [parentPath]: {
            access: parentAccess,
            roles: parentRoles,
            children: [...new Set(childrenAccess)]
        }
    };

    let childrenPermission = {};
    Object.entries(childrenModules)
        .forEach(([key, [roles, access]]) => {
            const childPermission: TPathPermissions = {
                [key]: {
                    access,
                    roles,
                    parent: parentPermission[parentPath]
                }
            };
            childrenPermission = {...childrenPermission, ...childPermission};
        });

    return {...parentPermission, ...childrenPermission};
}
