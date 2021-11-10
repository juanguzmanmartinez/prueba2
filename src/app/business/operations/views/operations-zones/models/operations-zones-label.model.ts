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
  [EZoneLabel.normal]: 'complementary-three',
  [EZoneLabel.hardAccess]: 'complementary-three',
  [EZoneLabel.dangerousF]: 'complementary-two',
  [EZoneLabel.dangerousM]: 'complementary-two',
  [EZoneLabel.heavyTraffic]: 'complementary-one',
  [EZoneLabel.daytimeZone]: 'primary',
  [EZoneLabel.regularZone]: 'complementary-one',
  [EZoneLabel.dangerousZone]: 'complementary-two',
};
