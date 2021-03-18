export enum EPaymentMethod {
    pos = 'pos',
    cash = 'efectivo',
    online = 'online',
    agora = 'agora'
}

export const CPaymentMethodName = {
    [EPaymentMethod.pos]: 'POS',
    [EPaymentMethod.cash]: 'Efectivo',
    [EPaymentMethod.online]: 'Online',
    [EPaymentMethod.agora]: 'Agora',
};

export const PaymentMethodList = [
    EPaymentMethod.pos,
    EPaymentMethod.cash,
    EPaymentMethod.online,
    EPaymentMethod.agora,
];
