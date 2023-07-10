export interface ICarrierStateResponse {
  stateType: string;
  description: string;
  value: string;
}

export interface ILocalResponse {
  localCode: string;
  name: string;
}

export interface ICarrierResponse {
  motorizedId: string;
  localCode: string;
  localFullName: string;
  nameMotorized: string;
  pendigRoute: string;
  supplier: string;
  entryTime: string;
  state: string;
  stateDescripcion: string;
  slow: string;
}
