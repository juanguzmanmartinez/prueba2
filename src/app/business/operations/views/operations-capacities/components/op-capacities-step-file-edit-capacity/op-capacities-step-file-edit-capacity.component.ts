import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { Subject, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-step-file-edit-capacity',
  templateUrl: './op-capacities-step-file-edit-capacity.component.html',
  styleUrls: ['./op-capacities-step-file-edit-capacity.component.scss'],
})
export class OpCapacitiesStepFileEditCapacityComponent
  implements OnInit, OnDestroy
{
  eventsSubject: Subject<void> = new Subject<void>();

  @ViewChild('inputAmpm') inputAmpm;
  textButtonNext = 'Cargar capacidades';
  private subscriptions = new Subscription();

  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router,
    private _storageClientService: StorageClientService
  ) {}
  elementToEdit = { code: '', local: '' };
  ampm = [];
  ret = [];
  scheduled = [];
  express = [];
  dataSource = [];
  mostrar: any = [];
  selection = new SelectionModel(true, []);
  disabledEditSave: boolean = false;
  count = 0;
  private fixedSelectedRows: any[] = [];

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
          this.ampm = element.ampm;
          this.ret = element.ret;
          this.scheduled = element.scheduled;
          this.express = element.express;

          this.countServices(element);
        }
      );
    this.subscriptions.add(subscription);

    const subscription1 = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription1);
    this._uploadCapacitiesStoreService.getDataSource$.subscribe((list) => {
      this.dataSource = list;
    });

    this._uploadCapacitiesStoreService.getDiableEdit$.subscribe((disabled) => {
      this.disabledEditSave = Object.values(disabled).some((item) => item);
    });
  }

  nextStep(e) {
    this.eventsSubject.next();
    this._uploadCapacitiesStoreService.setDataSource(this.dataSource);
    this._uploadCapacitiesStoreService.setCurrentStep('3');
    this._storageClientService.setStorageCrypto('data-source', this.dataSource);
  }

  cancelStep(e) {
    this._uploadCapacitiesStoreService.setCurrentStep('3');
  }

  get getTitle() {
    return `${this.elementToEdit.code} - ${this.elementToEdit.local}: Editar capacidad`;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  countServices(element) {
    let conut = 0;
    let services = ['ret', 'ampm', 'scheduled', 'express'];
    services.forEach((item) => {
      element[item].length > 0 ? conut++ : null;
    });
    this.count = conut;
  }
}
