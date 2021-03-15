import { ETag } from '@models/tag/tag.model';

export enum EState {
    active = 'active',
    inactive = 'inactive',
    close = 'inactive',
}

export const CStateValue = {
    [EState.active]: true,
    [EState.inactive]: false,
    [EState.close]: false
};

export const CStateTag = {
    [EState.active]: ETag.success,
    [EState.inactive]: ETag.error,
    [EState.close]: ETag.error,
};

export const CStateName = {
    [EState.active]: (vowel: string = 'o') => `activ${vowel}`,
    [EState.inactive]: (vowel: string = 'o') => `inactiv${vowel}`,
    [EState.close]: (vowel: string = 'o') => `cerrad${vowel}`
};

export enum EStateSetting {
    true = 'Y',
    false = 'N'
}

export const CStateSettingValue = {
    [EStateSetting.true]: true,
    [EStateSetting.false]: false,
};
