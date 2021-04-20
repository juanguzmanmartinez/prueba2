export enum EZoneType {
    main = 'main',
    backup = 'backup'
}

export const ZoneTypeList: EZoneType[] = [
    EZoneType.main,
    EZoneType.backup,
];

export const CZoneTypeName = {
    [EZoneType.main]: 'Regular',
    [EZoneType.backup]: 'Backup',
};


export const CZoneTypeValue = {
    [EZoneType.main]: false,
    [EZoneType.backup]: true,
};

export const CGZoneType = (isBackupZone: boolean) => {
    return isBackupZone ? EZoneType.backup : EZoneType.main;
};
