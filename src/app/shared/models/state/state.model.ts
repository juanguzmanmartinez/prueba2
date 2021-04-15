import { ETag } from '@models/tag/tag.model';

export enum EState {
    active = 'active',
    inactive = 'inactive',
    closed = 'closed',
    disabled = 'disabled',
    enabled = 'enabled',
}

export const CStateValue = {
    [EState.active]: true,
    [EState.inactive]: false,
    [EState.closed]: false,
    [EState.disabled]: false,
    [EState.enabled]: true,
};

export const CStateTag = {
    [EState.active]: ETag.success,
    [EState.inactive]: ETag.error,
    [EState.closed]: ETag.error,
    [EState.enabled]: ETag.success,
    [EState.disabled]: ETag.error,
};

export const CStateName = {
    [EState.active]: (vowel: string = 'o') => `activ${vowel}`,
    [EState.inactive]: (vowel: string = 'o') => `inactiv${vowel}`,
    [EState.closed]: (vowel: string = 'o') => `cerrad${vowel}`,
    [EState.enabled]: (vowel: string = 'o') => `activad${vowel}`,
    [EState.disabled]: (vowel: string = 'o') => `desactivad${vowel}`,
};

export enum EStateSetting {
    true = 'Y',
    false = 'N'
}

export const CStateSettingValue = {
    [EStateSetting.true]: true,
    [EStateSetting.false]: false,
};

export const CGStateByStateSetting = (stateSetting: EStateSetting) => {
    return CStateSettingValue[stateSetting] ? EState.enabled : EState.disabled;
};

export const CGStateSettingByValue = (value: boolean) => {
    return value ? EStateSetting.true : EStateSetting.false;
};

export const CGStateSettingByState = (state: EState) => {
    return CStateValue[state] ? EStateSetting.true : EStateSetting.false;
};
