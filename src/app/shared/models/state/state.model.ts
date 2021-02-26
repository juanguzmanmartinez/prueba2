export enum EState {
    active = 'active',
    inactive = 'inactive'
}

export const CStateTag = {
    [EState.active]: 'success',
    [EState.inactive]: 'error'
};

export const CStateName = {
    [EState.active]: 'activo',
    [EState.inactive]: 'inactivo'
};
