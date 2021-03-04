import { ETag } from '@models/tag/tag.model';

export enum EState {
    active = 'active',
    inactive = 'inactive'
}

export const CStateValue = {
    [EState.active]: true,
    [EState.inactive]: false
};

export const CStateTag = {
    [EState.active]: ETag.success,
    [EState.inactive]: ETag.error
};

export const CStateName = {
    [EState.active]: (vowel: string = 'o') => `activ${vowel}`,
    [EState.inactive]: (vowel: string = 'o') => `inactiv${vowel}`
};
