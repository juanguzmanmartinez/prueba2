import { ICarrierStateResponse } from '@interfaces/control-tower/control-tower.interface';

export const CarrierStateDBDummy: ICarrierStateResponse[] = [
  { stateType: 'ONLINE', description: 'Motorizado en Linea', value: 'N' },
  { stateType: 'AVAILABLE', description: 'Motorizado disponible', value: 'N' },
  { stateType: 'PACKING', description: 'Motorizado empacando', value: 'Y' },
  { stateType: 'ON_ROUTE', description: 'Motorizado en ruta', value: 'Y' },
  { stateType: 'RETURNING', description: 'Motorizado en retorno', value: 'N' },
  {
    stateType: 'DISABLED',
    description: 'Motorizado deshabilitado',
    value: 'N',
  },
  {
    stateType: 'OFFLINE',
    description: 'Motorizado fuera de linea',
    value: 'N',
  },
];
