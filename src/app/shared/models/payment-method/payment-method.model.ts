export enum EPaymentMethod {
    pos = 'pos',
    cash = 'efectivo',
    online = 'online'
}

export const CPaymentMethodName = {
    [EPaymentMethod.pos]: 'POS',
    [EPaymentMethod.cash]: 'Efectivo',
    [EPaymentMethod.online]: 'Online'
};

export const PaymentMethodList = [
    EPaymentMethod.pos,
    EPaymentMethod.cash,
    EPaymentMethod.online
];
