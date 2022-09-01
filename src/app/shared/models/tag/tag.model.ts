export enum ETag {
  error = 'danger',
  warning = 'warning',
  success = 'success',
}

export enum ETypeTagSemantic {
  error = 'danger',
  warning = 'warning',
  success = 'success',
}

export enum ETypeTagInformative {
  secondary = 'secondary',
  complementaryThree = 'complementary-three', // Tertiary
  complementaryTwo = 'complementary-two', // Quaternary
  complementaryOne = 'complementary-one', // Quintary
}

export enum ETypeTagBrand {
  inkafarma = 'inkafarma',
  mifarma = 'mifarma',
}

export enum ETagAppearance {
  default = 'default',
  uppercase = 'uppercase',
  transparentPill = 'pill-transparent',
  coloredWhitePill = 'pill-colored-white',
  coloredDarkPill = 'pill-colored-dark',
  semantic = 'semantic',
  informativeWhite = 'informative-white',
  brandWhite = 'brand-white',
  zoneTypeWhite = 'zone-type-white',
  coloredLilacPill = 'pill-colored-lilac',
  coloredFullLilacPill = 'pill-colored-full-lilac',
  coloredFullBluePill = 'pill-colored-full-blue',
  coloredFullGreasePill = 'pill-colored-full-gray-blue',
  coloredFullPurplePill = 'pill-colored-full-purple-blue',
}

export type TTagAppearance =
  | ETagAppearance.default
  | ETagAppearance.uppercase
  | ETagAppearance.transparentPill
  | ETagAppearance.coloredWhitePill
  | ETagAppearance.coloredDarkPill
  | ETagAppearance.semantic
  | ETagAppearance.informativeWhite
  | ETagAppearance.brandWhite
  | ETagAppearance.zoneTypeWhite
  | ETagAppearance.coloredFullLilacPill
  | ETagAppearance.coloredFullBluePill
  | ETagAppearance.coloredFullGreasePill
  | ETagAppearance.coloredFullPurplePill
  | ETagAppearance.coloredLilacPill;
