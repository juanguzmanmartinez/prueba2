import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-op-capacities-upload-delete-dialog',
  templateUrl: './op-capacities-upload-delete-dialog.component.html',
  styleUrls: ['./op-capacities-upload-delete-dialog.component.sass'],
})
export class OpCapacitiesUploadDeleteDialogComponent implements OnInit {
  @Input() local: any;

  constructor() {}

  ngOnInit(): void {}
}
