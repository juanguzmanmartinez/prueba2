import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { Subject, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../store/upload-capacities-store.service';

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
}
