import { OrderReasonCancelResponse } from "../interfaces/order-reason-cancel-response";

export class OrderReasonCancelModel{
  id:string;
  reason:string
  constructor(data:OrderReasonCancelResponse){
    this.id = data.id || '';
    this.reason = data.reason || '';
  }
}
