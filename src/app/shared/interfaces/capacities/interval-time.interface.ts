export interface IExpressIntervalTimeParams {
  localCode: string;
  serviceType: string;
}

export interface IExpressIntervalTimeRequest {
  localCode: string;
  serviceType: string;
  enabled: boolean;
  addCapacity: number;
  addIntervalTime: number;
  laps: number;
  consumptionMax: number;
}

export interface IExpressIntervalTimeResponse {
  success: boolean;
  message: string;
  data: {
    localCode: string;
    serviceType: string;
    enabled: boolean;
    baseLineCapacity: number;
    baseLineIntervalTime: number;
    consumptionMax: number;
    addCapacity: number;
    addIntervalTime: number;
    laps: number;
  };
}
