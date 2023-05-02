import { ICarrier } from '../../../interfaces/carrier.interface';

export const CarrierDB: ICarrier[] = [
  {
    value: '1',
    idCarrier: '1',
    name: 'Juan Perez',
    state: 'disponible',
  },
  {
    value: '2',
    idCarrier: '2',
    name: 'Denise Rojas',
    state: 'disponible',
  },
  {
    value: '3',
    idCarrier: '3',
    name: 'Renato Fernandez',
    state: 'no disponible',
  },
  {
    value: '4',
    idCarrier: '4',
    name: 'Álvaro Mendoza',
    state: 'en ruta',
    timeLeft: '20 min',
  },
];
