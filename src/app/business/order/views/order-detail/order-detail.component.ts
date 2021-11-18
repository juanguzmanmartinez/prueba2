import { Component, OnInit } from '@angular/core';
import { Flow } from '@molecules/flow/flow.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  flowData: Flow[] = [
    {
      flow: 'done',
      status: 'Confirmado',
      info: 'Pedido confirmado',
      infoDetail: 'Se actualizo en Inkatraker',
      date: '26/09 a las 10:00 am',
      name: 'Fernando Rojas'
    },
    {
      flow: 'done',
      status: 'En la tienda',
      info: 'Pedido generado',
      infoDetail: 'Se actualizo en Inkatraker',
      date: '26/09 a las 10:00 am',
      name: 'Esther Rojas'
    },
    {
      flow: 'done',
      status: 'Checkout',
      info: 'Pedido revisado',
      infoDetail: 'Se actualizo en Inkatraker',
      date: '26/09 a las 10:00 am',
      name: 'Benjamin Diaz'
    },
    {
      flow: 'cancel',
      status: 'Cancelado',
      info: 'Pedido cancelado',
      infoDetail: 'Se cancelo en Inkatraker',
      date: '-',
      name: '-'
    },
    {
      flow: 'pending',
      status: 'Asignado',
      info: 'Pedido asignado',
      infoDetail: 'Se actualizo en Inkatraker',
      date: '-',
      name: '-'
    },
    {
      flow: 'pending',
      status: 'En ruta',
      info: 'Pedido en camino',
      infoDetail: 'Se actualizo en Inkatraker',
      date: '-',
      name: '-'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
