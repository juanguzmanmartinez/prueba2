import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { Subject, Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../store/upload-capacities-store.service';
import { OpCapacitiesStepFileEditFormService } from './form/op-capacities-step-file-edit-form.service';

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
    private _storageClientService: StorageClientService,
    private _formBuilder: FormBuilder,
    public _opCapacitiesStepFileEditForm: OpCapacitiesStepFileEditFormService
  ) {
    // this.capacityTableForm = this._formBuilder.group({
    //   capacityRange: new FormControl(),
    //   capacityForSelection: new FormControl(),
    //   capacitySegmentList: new FormArray([]),
    // });
  }
  elementToEdit: any = {};
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
    // this.eventsSubject.next();
    // this._uploadCapacitiesStoreService.setDataSource(this.dataSource);
    // this._uploadCapacitiesStoreService.setCurrentStep('3');
    // this._storageClientService.setStorageCrypto('data-source', this.dataSource);
    let form = this._opCapacitiesStepFileEditForm.capacityTableForm$;

    this.elementToEdit.ampm =
      form.value.ampmList.length > 0 && form.value.ampmList
        ? form.value.ampmList
        : [];

    this.elementToEdit.ret =
      form.value.retList.length > 0 && form.value.retList
        ? form.value.retList
        : [];
    this.elementToEdit.express =
      form.value.expressList.length > 0 && form.value.expressList
        ? form.value.expressList
        : [];
    this.elementToEdit.scheduled =
      form.value.scheduledList.length > 0 && form.value.scheduledList
        ? form.value.scheduledList
        : [];
    this.elementToEdit.ampmTotalCapacity = this.elementToEdit.ampm.reduce(
      (a, { capacity }) => a + capacity,
      0
    );
    this.elementToEdit.expTotalCapacity = this.elementToEdit.express.reduce(
      (a, { capacity }) => a + capacity,
      0
    );
    this.elementToEdit.retTotalCapacity = this.elementToEdit.ret.reduce(
      (a, { capacity }) => a + capacity,
      0
    );
    this.elementToEdit.scheTotalCapacity = this.elementToEdit.scheduled.reduce(
      (a, { capacity }) => a + capacity,
      0
    );
    const subscription = this._uploadCapacitiesStoreService.setElementToEdit(
      this.elementToEdit
    );
    this.subscriptions.add(subscription);

    let dataStorage =
      this._storageClientService.getStorageCrypto('data-source');
    const target = dataStorage.findIndex((obj) => {
      return obj.local === this.elementToEdit.local;
    });
    if (target !== -1) dataStorage[target] = this.elementToEdit;

    this._uploadCapacitiesStoreService.setDataSource(dataStorage);
    this._storageClientService.setStorageCrypto('data-source', dataStorage);
    this._uploadCapacitiesStoreService.setCurrentStep('3');
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
  showform() {}
}
