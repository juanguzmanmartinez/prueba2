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
};
