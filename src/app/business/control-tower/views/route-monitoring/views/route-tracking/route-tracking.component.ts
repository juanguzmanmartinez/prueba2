import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-route-tracking',
  templateUrl: './route-tracking.component.html',
  styleUrls:['./route-tracking.component.scss']
})
export class RouteTrackingComponent implements OnInit {

  selectedCompanies = [];
  selectedLocals = [];
  companies = ['DISPONIBLE', 'EN RUTA', 'NO DISPONIBLE'];
  displayedColumns: string[] = [
    'local',
    'carrier',
    'provider',
    'vehicleType',
    'startHour',
    'status',
    'paused',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  dataFake: any[] = [
    {
      idCarrier: '1',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '2',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'EN RUTA',
      paused: 'No',
    },
    {
      idCarrier: '3',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'NO DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '4',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '5',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '6',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '7',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '8',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '9',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '10',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
  ];
ngOnInit(): void {
    this.dataSource.data =this.dataFake
}
  selectionChange(e: any) {}
  clearValues() {}
  viewCarrierRoute(id){}
}
