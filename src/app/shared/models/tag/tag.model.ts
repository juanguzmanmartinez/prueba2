export enum ETag {
    error = 'danger',
    warning = 'warning',
    success = 'success',
}

export enum ETagAppearance {
    default = 'default',
    uppercase = 'uppercase',
    transparentPill = 'pill-transparent',
    coloredWhitePill = 'pill-colored-white',
    coloredDarkPill = 'pill-colored-dark',
}

export type TTagAppearance =
    ETagAppearance.default |
    ETagAppearance.uppercase |
    ETagAppearance.transparentPill |
    ETagAppearance.coloredWhitePill |
    ETagAppearance.coloredDarkPill;
