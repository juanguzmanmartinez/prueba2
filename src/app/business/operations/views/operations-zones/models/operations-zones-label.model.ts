export enum EZoneLabel {
    normal = 'Normal',
    hardAccess = 'Dificil acceso',
    dangerous = 'Peligrosa',
    heavyTraffic = 'Tráfico pesado',
    daytimeZone = 'Zona Diurna',
    regularZone = 'Zona Regular',
    dangerousZone = 'Zona Peligrosa',
}

export const ZoneLabelList: EZoneLabel[] = [
    EZoneLabel.regularZone,
    EZoneLabel.daytimeZone,
    EZoneLabel.dangerousZone,
];

export const CZoneLabelColor = {
    [EZoneLabel.normal]: 'secondary-four',
    [EZoneLabel.hardAccess]: 'secondary-three',
    [EZoneLabel.dangerous]: 'secondary-two',
    [EZoneLabel.heavyTraffic]: 'secondary-one',
    [EZoneLabel.daytimeZone]: 'secondary-one',
    [EZoneLabel.regularZone]: 'secondary-one',
    [EZoneLabel.dangerousZone]: 'secondary-one',
};
