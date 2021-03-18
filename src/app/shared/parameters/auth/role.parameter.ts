export enum Role {
    Developer = 'ROLE_DEVELOPER',
    Admin = 'ROLE_ADMINISTRATOR',
    Viewer = 'ROLE_VIEWER',
    Assistant = 'ROLE_ASSISTANT'
}

export const RolesNames = {
    [Role.Admin]: 'Administrador de cuentas',
    [Role.Viewer]: 'Solo puede ver',
    [Role.Assistant]: 'Algunos permisos habilitados'
};
