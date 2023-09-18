export enum Access {
  Operations = 'OP',
  OperationZones = 'OP-Z',
  OperationStores = 'OP-L',
  OperationCapacities = 'OP-C',
  OperationSettings = 'OP-S',

  Administrator = 'AD',
  AdministratorUsers = 'AD-US',

  Order = 'OR',
  OrderRecords = 'OR-HM',

  Capacities = 'CP', //CP
  CapacitiesServiceType = 'CP-BL', //BL

  ControlTower = 'CT', //CT
  CTControlFleet = 'CT-CF', //CT-CF
  CTRouteMonitoring = 'CT-RM' //CT-RM
}

