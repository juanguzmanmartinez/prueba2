export enum EZoneLabel {
    normal = 'Normal',
    hardAccess = 'Dificil acceso',
    dangerous = 'Peligrosa',
    heavyTraffic = 'Tráfico pesado',
}

export const ZoneLabelList: EZoneLabel[] = [
    EZoneLabel.normal,
    EZoneLabel.hardAccess,
    EZoneLabel.dangerous,
    EZoneLabel.heavyTraffic,
];

export const CZoneLabelColor = {
    [EZoneLabel.normal]: 'secondary-four',
    [EZoneLabel.hardAccess]: 'secondary-three',
    [EZoneLabel.dangerous]: 'secondary-two',
    [EZoneLabel.heavyTraffic]: 'secondary-one'
};
