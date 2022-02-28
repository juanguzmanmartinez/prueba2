import { ETypeTagSemantic } from '@models/tag/tag.model';
import { ETextColor } from '@models/text/text.model';

export enum ELiquidationStatus {
  billed = 'BILLED',
  cancelled = 'CANCELLED',
  charged = 'CHARGED',
  chargeError = 'CHARGE_ERROR',
  chargeNotEnabled = 'CHARGE_NOT_ENABLED',
  error = 'ERROR',
  errorBilled = 'ERROR_BILLED', //
  inProcess = 'IN_PROCESS',
  liquidated = 'LIQUIDATED',
  liquidatedCn = 'LIQUIDATED_CN',
  partialBilled = 'PARTIAL_BILLED',
  partialLiquidated = 'PARTIAL_LIQUIDATED',
  pending = 'PENDING',
  pendingCharge = 'PENDING_CHARGE',
  pendingLiquidation = 'PENDING_LIQUIDATION',
  pendingRefund = 'PENDING_REFUND',
  refunded = 'REFUNDED',
  refundError = 'REFUND_ERROR',
  refundNotEnabled = 'REFUND_NOT_ENABLED',
  requiresRecharge = 'REQUIRES_RECHARGE', //
  requiresReturn = 'REQUIRES_RETURN', //

  automaticCancellation = 'AUTOMATIC_CANCELATION',
  pendingLiquidate = 'PENDING_LIQUIDATE', //
  errorPendingLiquidate = 'ERROR_PENDING_LIQUIDATE', //
  errorCancelled = 'ERROR_CANCELLED', //
  errorAutomaticCancelled = 'ERROR_AUTOMATIC_CANCELLED', //
  automaticCancelled = 'AUTOMATIC_CANCELLED', //
  errorInProcess = 'ERROR_IN_PROCESS', //
  errorError = 'ERROR_ERROR', //
  errorPending = 'ERROR_PENDING', //
}

export const CLiquidationStatusTranslation = {
  [ELiquidationStatus.billed]: 'Facturado',
  [ELiquidationStatus.cancelled]: 'Cancelado antes de facturación',
  [ELiquidationStatus.charged]: 'Cobrado',
  [ELiquidationStatus.chargeError]: 'Error al cobrar',
  [ELiquidationStatus.chargeNotEnabled]: 'Local no activado para liquidacion',
  [ELiquidationStatus.error]: 'Error al insertar pedido',
  [ELiquidationStatus.inProcess]: 'En proceso de atención',
  [ELiquidationStatus.liquidated]: 'Liquidado',
  [ELiquidationStatus.liquidatedCn]: 'Pedido cancelado/rechazado',
  [ELiquidationStatus.partialBilled]: 'Facturado parcial',
  [ELiquidationStatus.partialLiquidated]: 'Liquidado parcial',
  [ELiquidationStatus.pending]: 'Pendiente de facturación',
  [ELiquidationStatus.pendingCharge]: 'Pendiente de cobrar',
  [ELiquidationStatus.pendingLiquidation]: 'Pedido facturado sin confirmar',
  [ELiquidationStatus.pendingRefund]: 'Pendiente de anular',
  [ELiquidationStatus.refunded]: 'Extorno exitoso',
  [ELiquidationStatus.refundError]: 'Error en pasarela al extornar',
  [ELiquidationStatus.refundNotEnabled]: 'Local no activado para liquidacion',
  [ELiquidationStatus.automaticCancellation]: 'Cancelado antes de facturación',

  [ELiquidationStatus.errorBilled]: 'Error en la facturación',
  [ELiquidationStatus.pendingLiquidate]: 'Pendiente para liquidar',
  [ELiquidationStatus.errorPendingLiquidate]:
    'Error antes de pendiente a liquidar', //
  [ELiquidationStatus.errorCancelled]: 'Error antes de Cancelar', //
  [ELiquidationStatus.errorAutomaticCancelled]:
    'Error automatico antes de Cancelar', //
  [ELiquidationStatus.automaticCancelled]:
    'Orden cancelada antes de insertar el pedido en el local',
  [ELiquidationStatus.errorInProcess]: 'Error antes de proceso de atención', //
  [ELiquidationStatus.errorError]: 'Error', //
  [ELiquidationStatus.errorPending]: 'Error en pendiente de facturación', //
};

export const CLiquidationStatusTypeSemanticTag = {
  [ELiquidationStatus.automaticCancellation]: ETypeTagSemantic.error,
  [ELiquidationStatus.billed]: ETypeTagSemantic.success,
  [ELiquidationStatus.cancelled]: ETypeTagSemantic.error,
  [ELiquidationStatus.charged]: ETypeTagSemantic.success,
  [ELiquidationStatus.chargeError]: ETypeTagSemantic.error,
  [ELiquidationStatus.chargeNotEnabled]: ETypeTagSemantic.error,
  [ELiquidationStatus.error]: ETypeTagSemantic.error,
  [ELiquidationStatus.inProcess]: ETypeTagSemantic.warning,
  [ELiquidationStatus.liquidated]: ETypeTagSemantic.success,
  [ELiquidationStatus.liquidatedCn]: ETypeTagSemantic.error,
  [ELiquidationStatus.partialBilled]: ETypeTagSemantic.warning,
  [ELiquidationStatus.partialLiquidated]: ETypeTagSemantic.success,
  [ELiquidationStatus.pending]: ETypeTagSemantic.warning,
  [ELiquidationStatus.pendingCharge]: ETypeTagSemantic.warning,
  [ELiquidationStatus.pendingLiquidation]: ETypeTagSemantic.warning,
  [ELiquidationStatus.pendingRefund]: ETypeTagSemantic.warning,
  [ELiquidationStatus.refunded]: ETypeTagSemantic.error,
  [ELiquidationStatus.refundError]: ETypeTagSemantic.error,
  [ELiquidationStatus.refundNotEnabled]: ETypeTagSemantic.error,
};

export const CLiquidationStatusTextColor = {
  [ELiquidationStatus.automaticCancellation]: ETextColor.error,
  [ELiquidationStatus.billed]: ETextColor.success,
  [ELiquidationStatus.cancelled]: ETextColor.error,
  [ELiquidationStatus.charged]: ETextColor.success,
  [ELiquidationStatus.chargeError]: ETextColor.error,
  [ELiquidationStatus.chargeNotEnabled]: ETextColor.error,
  [ELiquidationStatus.error]: ETextColor.error,
  [ELiquidationStatus.inProcess]: ETextColor.warning,
  [ELiquidationStatus.liquidated]: ETextColor.success,
  [ELiquidationStatus.liquidatedCn]: ETextColor.error,
  [ELiquidationStatus.partialBilled]: ETextColor.warning,
  [ELiquidationStatus.partialLiquidated]: ETextColor.success,
  [ELiquidationStatus.pending]: ETextColor.warning,
  [ELiquidationStatus.pendingCharge]: ETextColor.warning,
  [ELiquidationStatus.pendingLiquidation]: ETextColor.warning,
  [ELiquidationStatus.pendingRefund]: ETextColor.warning,
  [ELiquidationStatus.refunded]: ETextColor.error,
  [ELiquidationStatus.refundError]: ETextColor.error,
  [ELiquidationStatus.refundNotEnabled]: ETextColor.error,
};
