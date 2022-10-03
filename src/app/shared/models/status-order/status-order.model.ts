import { ETextColor } from '@models/text/text.model';

export enum EStatusOrder {
  confirmed = 'CONFIRMED',
  cancelled = 'CANCELLED',
  delivered = 'DELIVERED',
  readyForPickup = 'READY_FOR_PICKUP',
  onStore = 'ON_STORE',
  assigned = 'ASSIGNED',
  picking = 'PICKING',
  prepared = 'PREPARED',
  onRouted = 'ON_ROUTE',
  arrived = 'ARRIVED',
  rejected = 'REJECTED',
  checkout = 'CHECKOUT',
  onHold = 'ON_HOLD',
  readyToAssign = 'READY_TO_ASSIGN',
  error = 'ERROR',
  errorArrived = 'ERROR_ARRIVED',
  errorAssigned = 'ERROR_ASSIGNED',
  errorCancelled = 'ERROR_CANCELLED',
  errorDelivered = 'ERROR_DELIVERED',
  errorOnHold = 'ERROR_ON_HOLD',
  errorOnRouted = 'ERROR_ON_ROUTED',
  errorPicked = 'ERROR_PICKED',
  errorReadyForPickup = 'ERROR_READY_FOR_PICKUP',
  errorReadyToAssign = 'ERROR_READY_TO_ASSIGN',
  externalAssigned = 'EXT_ASSIGNED',
  errorExternalAssigned = 'ERROR_EXT_ASSIGNED',
}

export const CStatusOrderName = {
  [EStatusOrder.confirmed]: 'Confirmado',
  [EStatusOrder.cancelled]: 'Cancelado',
  [EStatusOrder.delivered]: 'Entregado',
  [EStatusOrder.readyForPickup]: 'Listo para recoger',
  [EStatusOrder.onStore]: 'En tienda',
  [EStatusOrder.assigned]: 'Asignado',
  [EStatusOrder.picking]: 'Picking',
  [EStatusOrder.prepared]: 'Preparado',
  [EStatusOrder.onRouted]: 'En ruta',
  [EStatusOrder.arrived]: 'Llegó',
  [EStatusOrder.rejected]: 'Rechazado',
  [EStatusOrder.checkout]: 'Checkout',
  [EStatusOrder.onHold]: 'En espera',
  [EStatusOrder.readyToAssign]: 'Listo para asignar',
  [EStatusOrder.error]: 'Error de inserción',
  [EStatusOrder.errorArrived]: 'Error llegó',
  [EStatusOrder.errorAssigned]: 'Error asignado',
  [EStatusOrder.errorCancelled]: 'Error cancelado',
  [EStatusOrder.errorDelivered]: 'Error entregado',
  [EStatusOrder.errorOnHold]: 'Error en espera',
  [EStatusOrder.errorOnRouted]: 'Error en ruta',
  [EStatusOrder.errorPicked]: 'Error en picking',
  [EStatusOrder.errorReadyForPickup]: 'Error listo para recoger',
  [EStatusOrder.externalAssigned]: 'Asignado por ruteador',
  [EStatusOrder.errorExternalAssigned]: 'Error asignado por ruteador'
};

export const CStatusOrderColor = {
  [EStatusOrder.confirmed]: ETextColor.success,
  [EStatusOrder.cancelled]: ETextColor.error,
  [EStatusOrder.delivered]: ETextColor.success,
  [EStatusOrder.readyForPickup]: ETextColor.success,
  [EStatusOrder.onStore]: ETextColor.warning,
  [EStatusOrder.assigned]: ETextColor.success,
  [EStatusOrder.picking]: ETextColor.success,
  [EStatusOrder.prepared]: ETextColor.warning,
  [EStatusOrder.onRouted]: ETextColor.success,
  [EStatusOrder.arrived]: ETextColor.success,
  [EStatusOrder.rejected]: ETextColor.error,
  [EStatusOrder.checkout]: ETextColor.warning,
  [EStatusOrder.onHold]: ETextColor.warning,
  [EStatusOrder.readyToAssign]: ETextColor.warning,
  [EStatusOrder.error]: ETextColor.error,
  [EStatusOrder.errorArrived]: ETextColor.error,
  [EStatusOrder.errorAssigned]: ETextColor.error,
  [EStatusOrder.errorCancelled]: ETextColor.error,
  [EStatusOrder.errorDelivered]: ETextColor.error,
  [EStatusOrder.errorOnHold]: ETextColor.error,
  [EStatusOrder.errorOnRouted]: ETextColor.error,
  [EStatusOrder.errorPicked]: ETextColor.error,
  [EStatusOrder.errorReadyForPickup]: ETextColor.error,
  [EStatusOrder.errorReadyToAssign]: ETextColor.error,
  [EStatusOrder.externalAssigned]: ETextColor.success,
  [EStatusOrder.errorExternalAssigned]: ETextColor.error
};

export const CStatusOrderNameCall = {
  [EStatusOrder.onStore]: 'Avisado',
  [EStatusOrder.picking]: 'Avisado',
  [EStatusOrder.readyToAssign]: 'Avisado',
  [EStatusOrder.checkout]: 'Proforma',
  [EStatusOrder.prepared]: 'Proforma',
  [EStatusOrder.readyForPickup]: 'Proforma',
  [EStatusOrder.assigned]: 'Proforma',
  [EStatusOrder.onRouted]: 'Llevando',
  [EStatusOrder.arrived]: 'Llegada',
  [EStatusOrder.delivered]: 'Entregado',
  [EStatusOrder.rejected]: 'Anulado',
  [EStatusOrder.cancelled]: 'Anulado'
};

export const LStatusOrderRADDC = [
  CStatusOrderName[EStatusOrder.onStore],
  CStatusOrderName[EStatusOrder.checkout],
  CStatusOrderName[EStatusOrder.prepared],
  CStatusOrderName[EStatusOrder.assigned],
  CStatusOrderName[EStatusOrder.onRouted],
  CStatusOrderName[EStatusOrder.arrived],
  CStatusOrderName[EStatusOrder.delivered],
  CStatusOrderName[EStatusOrder.rejected],
  CStatusOrderName[EStatusOrder.cancelled]
];

export const LStatusOrderRADLITE = [
  CStatusOrderName[EStatusOrder.onStore],
  CStatusOrderName[EStatusOrder.picking],
  CStatusOrderName[EStatusOrder.readyToAssign],
  CStatusOrderName[EStatusOrder.prepared],
  CStatusOrderName[EStatusOrder.onRouted],
  CStatusOrderName[EStatusOrder.arrived],
  CStatusOrderName[EStatusOrder.delivered],
  CStatusOrderName[EStatusOrder.rejected],
  CStatusOrderName[EStatusOrder.cancelled],
  CStatusOrderName[EStatusOrder.externalAssigned]
];

export const LStatusOrderRETLITE = [
  CStatusOrderName[EStatusOrder.onStore],
  CStatusOrderName[EStatusOrder.readyForPickup],
  CStatusOrderName[EStatusOrder.delivered],
  CStatusOrderName[EStatusOrder.delivered],
  CStatusOrderName[EStatusOrder.cancelled]
];
