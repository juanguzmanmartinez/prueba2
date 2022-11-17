export enum EIntervalControlName {
  consumptionMax = 'consumptionMax',
  addCapacity = 'addCapacity',
  addIntervalTime = 'addIntervalTime',
  laps = 'laps',
}

export const CMessageErrorIsZero = {
  [EIntervalControlName.consumptionMax]: 'El porcentaje debe ser mayor a 0%',
  [EIntervalControlName.addCapacity]: 'La capacidad debe ser mayor a 0',
  [EIntervalControlName.addIntervalTime]: 'Los minutos debe ser mayor a 0 ',
  [EIntervalControlName.laps]: 'La cantidad de vueltas debe ser mayor a 0',
};

export const CMessageErrorMaxValue = {
  [EIntervalControlName.consumptionMax]: 'El porcentaje no debe superar 100%',
}

export const CMessageError = {
  required: 'El campo se encuentra vacío'
}
