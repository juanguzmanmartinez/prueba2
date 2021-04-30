export enum EZoneType {
    main = 'main',
    backup = 'backup'
}

export const CZoneTypeName = {
    [EZoneType.main]: 'Para cobertura',
    [EZoneType.backup]: 'No cobertura',
};

export const ZoneTypeList = [
    EZoneType.main,
    EZoneType.backup
];

export const CZoneTypeValue = {
    [EZoneType.main]: false,
    [EZoneType.backup]: true,
};

export const CGZoneType = (isBackupZone: boolean) => {
    return isBackupZone ? EZoneType.backup : EZoneType.main;
};
