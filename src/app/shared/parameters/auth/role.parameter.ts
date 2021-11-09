export enum Role {
    Developer = 'ROLE_DEVELOPER',
    Editor = 'ROLE_EDITOR',
    Viewer = 'ROLE_VIEWER',
}

export const CRoleName = {
    [Role.Viewer]: 'Visualizar',
    [Role.Editor]: 'Editar'
};
