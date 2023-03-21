import { ITypeSearch } from '../interfaces/order-filter.interface';

export enum ECodeTypeSearch {
  pedido = '1',
  telefono = '2',
  documento = '3',
}

export enum EDates {
  hoy = 'Hoy',
  ayer = 'Ayer',
  anteAyer = 'Anteayer',
  ultimaSemana = 'Última semana',
  ultimoMes = 'Último mes',
  otroPeriodo = 'Otro periodo',
}

export const CTypesSearch: ITypeSearch[] = [
  {
    code: ECodeTypeSearch.pedido,
    icon: 'local_mall',
    name: 'Nº de pedido',
    maxLength: '11',
    alphanumeric: false,
  },
  {
    code: ECodeTypeSearch.telefono,
    icon: 'call',
    name: 'Nº de teléfono',
    maxLength: '9',
    alphanumeric: false,
  },
  {
    code: ECodeTypeSearch.documento,
    icon: 'assignment_ind',
    name: 'Doc. Identidad',
    maxLength: '12',
    alphanumeric: true,
  },
];
