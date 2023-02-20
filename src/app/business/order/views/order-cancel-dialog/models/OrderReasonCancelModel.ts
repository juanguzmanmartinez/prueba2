import { OrderReasonCancelResponse } from "../interfaces/order-reason-cancel-response";

export class OrderReasonCancelModel{
  code:string;
  description:string
  constructor(data:OrderReasonCancelResponse){
    this.code = data.code || '';
    this.description = data.description || '';
  }
}
