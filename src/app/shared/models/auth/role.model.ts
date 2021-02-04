export enum Role {
    Assistant = 'ROLE_ASSISTANT',
    Viewer = 'ROLE_VIEWER',
    Admin = 'ROLE_ADMINISTRATOR'
}

export const RolesNames = {
    [Role.Assistant]: 'Algunos permisos habilitados',
    [Role.Admin]: 'Administrador de cuentas',
    [Role.Viewer]: 'Solo puede ver'
};
