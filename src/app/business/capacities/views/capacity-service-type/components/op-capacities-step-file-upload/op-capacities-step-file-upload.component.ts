import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { IStoreUpload } from '@interfaces/capacities/upload-capacities.interface';
import { AlertService } from '@molecules/alert/alert.service';
import * as XLSX from 'xlsx';
import { TABS } from '../../constants/step-tabs.constants';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { UploadCapacitiesStoreService } from '../../store/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-step-file-upload',
  templateUrl: './op-capacities-step-file-upload.component.html',
  styleUrls: ['./op-capacities-step-file-upload.component.scss'],
})
export class OpCapacitiesStepFileUploadComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  disableNext = true;
  files = [];
  fileName: string = '';
  textButton: string = 'Regresar';
  dataRaw = [];
  file: any;
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _alertService: AlertService,
    private _operationsCapacitiesImplementService: OperationsCapacitiesImplementService,
    private _storageClientService: StorageClientService
  ) {}

  ngOnInit(): void {
    TABS[0].icon = 'check';
    TABS[0].left = 'done';
    TABS[0].rigth = 'done';
    TABS[1].icon = 'done';
    TABS[1].left = 'done';
    TABS[1].rigth = 'pending';

    TABS[2].icon = 'pending';
    TABS[2].left = 'pending';
    TABS[2].rigth = 'done';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.getDataRaw$.subscribe((dataRaw) => {
      if (dataRaw && dataRaw.length > 0) this.dataRaw = dataRaw;
      else
        this.dataRaw = this._storageClientService.getStorageCrypto('data-raw');
    });
  }

  fileBrowseHandler(ev: any) {
    this.file = ev.target.files[0];
    var allowedExtensions = /(\.xls|\.xlsm|\.xlsx|\.xlsb)$/i;
    if (!allowedExtensions.exec(this.file.name)) {
      this.disableNext = true;
      return this._alertService.alertError(
        'Error de subida, este formato no es soportado. Recuerda que solo se pueden subir archivos excel.'
      );
    }

    if (this.file.name) if (this.files.length > 0) this.files = [];
    this.fileName = ev.target.files[0].name;
    this.files.push(ev.target.files[0]);
    let workBook = null;
    let jsonData: IStoreUpload[] = [];
    const reader = new FileReader();
    const file = this.files[0];
    let dataTosStore = [];
    reader.onload = () => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      const dataraw = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      let dataToProcess = [];
      let noRegistered = [];
      dataraw['Plantilla descarga capacidades'].forEach((item: any) => {
        let founded = this.dataRaw.find((raw) => {
          return (
            item['Cod. Local'] === raw.storeCode &&
            raw.storeName == item['Local']
          );
        });
        if (founded == undefined) noRegistered.push(founded);

        let store: any = {};
        if (item['Servicio']) store.service = item['Servicio'];
        if (item['Cod. Local']) store.storeCode = item['Cod. Local'];
        if (item['Local']) store.storeName = item['Local'];
        if (item['SegmentoHorario']) store.timeRange = item['SegmentoHorario'];
        if (item['Capacidad'] || item['Capacidad'] == 0)
          store.capacity = item['Capacidad'];

        dataToProcess.push(store);
      });
      jsonData = dataToProcess;

      if (noRegistered.length > 0) {
        this.disableNext = true;
        return this._alertService.alertError(
          'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
        );
      }
      try {
        if (!this.execute(jsonData)) {
          this.disableNext = true;
          return this._alertService.alertError(
            'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
          );
        }

        jsonData.map((item: any) => {
          this.dataRaw.forEach((dat: any) => {
            if (
              item.service != 'EXP' &&
              item.timeRange == dat.timeRange &&
              item.storeCode == dat.storeCode
            ) {
              item.value = dat.value;
              return item;
            }
            if (item.storeCode === dat.storeCode && item.service == 'EXP') {
              return item;
            }
          });
        });

        this._operationsCapacitiesImplementService
          .validateStores$(jsonData)
          .subscribe(
            (res) => {
              let validate = res.every((item: any) => item.validate == true);
              if (!validate) {
                this.disableNext = true;
                return this._alertService.alertError(
                  'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
                );
              }
              dataTosStore = jsonData.map((local, index) => {
                return {
                  ...local,
                  id: index,
                };
              });
              this.disableNext = false;

              this._uploadCapacitiesStoreService.setStoreList(dataTosStore);
              this._storageClientService.setStorageCrypto(
                'list-stores',
                dataTosStore
              );
            },
            (error) => {
              this.disableNext = true;
              return this._alertService.alertError(
                'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
              );
            }
          );
      } catch (error) {
        return this._alertService.alertError(
          'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
        );
      }
    };

    reader.readAsBinaryString(file);
  }
  onChangeInput() {
    this.inputRef.nativeElement.value = null;
    this.inputRef.nativeElement.click();
  }
  nextStep(e: any) {
    if (this.files.length > 0) {
      this._uploadCapacitiesStoreService.setCurrentStep('3');
      this._storageClientService.setStorageCrypto('current-step', 3);
    }
  }
  cancelStep(e: any) {
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.setStoreList([]);
    this._uploadCapacitiesStoreService.setCurrentStep('1');
    this._storageClientService.setStorageCrypto('current-step', '1');
  }
  instanceOfIStoreUpload(object: any): object is IStoreUpload {
    return (
      'service' in object &&
      'storeCode' in object &&
      'storeName' in object &&
      'timeRange' in object &&
      'capacity' in object
    );
  }

  execute(stores) {
    return (
      stores.every((item) => this.instanceOfIStoreUpload(item)) &&
      stores.every((item) => item.capacity >= 0)
    );
  }
  convert(locals: IStoreUpload[]) {
    let dataProcessed = [];
    locals.forEach((local: IStoreUpload) => {
      let locaolFounded = dataProcessed.some(
        (it) => it.code == local.storeCode
      );

      if (!locaolFounded) {
        dataProcessed.push({
          code: local.storeCode,
          local: local.storeName,
          ampm: [],
          scheduled: [],
          express: [],
          ret: [],
          status: false,
        });
      }

      let type = dataProcessed.find((item) => item.local === local.storeName);

      isNaN(local.capacity) ? (type.status = true) : null;
      if (type) {
        switch (local.service) {
          case 'PROG':
            type.scheduled.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
          case 'AM_PM':
            type.ampm.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
          case 'EXP':
            type.express.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
          case 'RET':
            type.ret.push({
              segment: local.timeRange,
              capacity: local.capacity,
              id: local.id,
            });
            break;
        }
      }
      dataProcessed.map((item) => item.code == type.code ?? type);
    });
    return dataProcessed;
  }
}
