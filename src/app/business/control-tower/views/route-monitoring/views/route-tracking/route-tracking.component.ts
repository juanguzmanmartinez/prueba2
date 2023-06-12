import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetailRouteDialogService } from './components/detail-route-dialog/detail-route-dialog.service';
import { Router } from '@angular/router';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';

@Component({
  selector: 'app-route-tracking',
  templateUrl: './route-tracking.component.html',
  styleUrls: ['./route-tracking.component.scss'],
})
export class RouteTrackingComponent implements OnInit {
  selectedCompanies = [];
  selectedLocals = [];
  companies = ['DISPONIBLE', 'EN RUTA', 'NO DISPONIBLE'];
  displayedColumns: string[] = [
    'local',
    'idRoute',
    'carrier',
    'state',
    'endHour',
    'completedOrders',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  dataFake: any[] = [
    {
      idCarrier: '1',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN PREPARACIÓN',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '2',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'POR INICIAR RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '3',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '4',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '5',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '6',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '7',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '8',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '9',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
    {
      idCarrier: '10',
      idRoute: '12346-DB',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      state: 'EN RUTA',
      endHour: '1:02 p.m.',
      completedOrders: '1',
    },
  ];

  locals = [
    {
      value: 'IFK-609',
      label: 'Gerardo Unger 3',
    },
    {
      value: 'IFK-610',
      label: 'Javier prado 4',
    },
  ];

  routeStates = [
    {
      value: '1',
      label: 'EN PREPARACIÓN',
    },
    {
      value: '2',
      label: 'POR INICIAR RUTA',
    },
    {
      value: '3',
      label: 'EN RUTA',
    },
  ];

  constructor(
    private dialog: DetailRouteDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.dataFake;
  }
  selectionChange(e: any) {}
  clearValues() {}
  viewCarrierRoute(id) {}

  openDialog(): void {
    this.dialog.open().afterClosed().subscribe();
  }

  directToAllocation(): void {
    const idCarrier = '1';
    this.router.navigate([CT_ROUTER_PATH.ctAllocationRouting(idCarrier)]);
  }
}
