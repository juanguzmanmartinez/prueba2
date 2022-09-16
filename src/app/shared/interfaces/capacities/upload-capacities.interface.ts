export interface IStoreUpload {
  service: string;
  storeCode: string;
  storeName: string;
  timeRange: string;
  capacity: number;
  id?: number;
}

export interface IStoreProcessed {
  code: string;
  local: string;
  ampm?: any;
  express?: any;
  ret?: any;
  scheduled?: any;
  ampmTotalCapacity?: number;
  expTotalCapacity?: number;
  scheTotalCapacity?: number;
  retTotalCapacity?: number;
  status?: boolean;
}
