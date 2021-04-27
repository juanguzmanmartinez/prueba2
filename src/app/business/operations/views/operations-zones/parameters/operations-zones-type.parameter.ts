export enum EZoneType {
    main = 'main',
    backup = 'backup'
}

export const CZoneTypeName = {
    [EZoneType.main]: 'Para cobertura',
    [EZoneType.backup]: 'No cobertura',
};


export const CZoneTypeValue = {
    [EZoneType.main]: false,
    [EZoneType.backup]: true,
};

export const CGZoneType = (isBackupZone: boolean) => {
    return isBackupZone ? EZoneType.backup : EZoneType.main;
};
