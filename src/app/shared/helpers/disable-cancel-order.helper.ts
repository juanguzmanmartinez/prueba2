import { EStatusOrder, LStatusOrderRADDC } from "@models/status-order/status-order.model";

export class OrderHelper{
  static disableCancel(status:string){
    if(LStatusNotAllowed.includes(status)) return true
    return false;
  }
}

export const LStatusNotAllowed:string[] = [
  EStatusOrder.cancelled,
  EStatusOrder.onRouted,
  EStatusOrder.arrived,
  EStatusOrder.delivered
]
