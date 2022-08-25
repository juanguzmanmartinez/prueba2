import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-step-file-edit-capacity',
  templateUrl: './op-capacities-step-file-edit-capacity.component.html',
  styleUrls: ['./op-capacities-step-file-edit-capacity.component.scss'],
})
export class OpCapacitiesStepFileEditCapacityComponent implements OnInit {
  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router
  ) {}
  dataSource = {
    code: 'AF8',
    local: 'LOS OLIVOS',
    ampm: [
      {
        segment: '08:00 am - 02:00 pm',
        capacity: 6,
      },
      {
        segment: '02:00 pm - 08:00 pm',
        capacity: 10,
      },
      {
        segment: '08:00 pm - 08:30 pm',
        capacity: 2,
      },
    ],
    scheduled: [
      {
        segment: '08:00 am - 11:00 am',
        capacity: 1,
      },
      {
        segment: '02:00 pm - 05:00 pm',
        capacity: 3,
      },
      {
        segment: '05:00 pm - 08:00 pm',
        capacity: 4,
      },
      {
        segment: '08:00 pm - 11:00 pm',
        capacity: 5,
      },
    ],
    express: [
      {
        segment: '-',
        capacity: 1,
      },
    ],
    ret: [
      {
        segment: '08:00 am - 11:00 am',
        capacity: 23,
      },
      {
        segment: '11:00 am - 02:00 pm',
        capacity: 2,
      },
      {
        segment: '02:00 pm - 05:00 pm',
        capacity: 5,
      },
      {
        segment: '05:00 pm - 08:00 pm',
        capacity: 0,
      },
    ],
    ampmTotalCapacity: 18,
    expTotalCapacity: 1,
    scheTotalCapacity: 13,
    retTotalCapacity: 30,
  };
  ampm = [
    {
      segment: '08:00 am - 02:00 pm',
      capacity: 6,
    },
    {
      segment: '02:00 pm - 08:00 pm',
      capacity: 10,
    },
    {
      segment: '08:00 pm - 08:30 pm',
      capacity: 2,
    },
  ];
  ret = [
    {
      segment: '08:00 am - 11:00 am',
      capacity: 23,
    },
    {
      segment: '11:00 am - 02:00 pm',
      capacity: 2,
    },
    {
      segment: '02:00 pm - 05:00 pm',
      capacity: 5,
    },
    {
      segment: '05:00 pm - 08:00 pm',
      capacity: 0,
    },
  ];
  scheduled = [
    {
      segment: '08:00 am - 11:00 am',
      capacity: 1,
    },
    {
      segment: '02:00 pm - 05:00 pm',
      capacity: 3,
    },
    {
      segment: '05:00 pm - 08:00 pm',
      capacity: 4,
    },
    {
      segment: '08:00 pm - 11:00 pm',
      capacity: 5,
    },
  ];
  ngOnInit(): void {}
  nextStep(e) {}
  cancelStep(e) {}
}
