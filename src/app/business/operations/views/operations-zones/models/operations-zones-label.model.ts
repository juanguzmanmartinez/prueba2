export enum EZoneLabel {
    normal = 'Normal',
    hardAccess = 'Dificil acceso',
    dangerousF = 'Peligrosa',
    dangerousM = 'Peligroso',
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
    [EZoneLabel.dangerousF]: 'secondary-two',
    [EZoneLabel.dangerousM]: 'secondary-two',
    [EZoneLabel.heavyTraffic]: 'secondary-one',
    [EZoneLabel.daytimeZone]: 'primary',
    [EZoneLabel.regularZone]: 'secondary-one',
    [EZoneLabel.dangerousZone]: 'secondary-two',
};
