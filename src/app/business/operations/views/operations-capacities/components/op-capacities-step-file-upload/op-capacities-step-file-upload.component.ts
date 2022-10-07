import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStoreUpload } from '@interfaces/capacities/upload-capacities.interface';
import { AlertService } from '@molecules/alert/alert.service';
import * as XLSX from 'xlsx';
import { TABS } from '../../constants/step-tabs.constants';
import { OperationsCapacitiesImplementService } from '../../implements/operations-capacities-implement.service';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

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
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _alertService: AlertService,
    private _operationsCapacitiesImplementService: OperationsCapacitiesImplementService
  ) {}

  ngOnInit(): void {
    TABS[1].flow = 'done';
    TABS[1].icon = 'done';
    TABS[0].icon = 'check';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.getDataRaw$.subscribe((dataRaw) => {
      this.dataRaw = dataRaw;
    });
  }

  fileBrowseHandler(ev: any) {
    if (this.files.length > 0) this.files = [];
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
      jsonData = dataraw['Plantilla descarga capacidades'];

      try {
        if (!this.execute(jsonData))
          return this._alertService.alertError(
            'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
          );
        jsonData.map((item: any) => {
          this.dataRaw.forEach((dat: any) => {
            if (item.service != 'EXP' && item.timeRange == dat.timeRange)
              item.value = dat.value;
          });
          return item;
        });

        this._operationsCapacitiesImplementService
          .validateStores$(jsonData)
          .subscribe((res) => {
            let validate = res.every((item: any) => item.validate == true);
            if (!validate)
              return this._alertService.alertError(
                'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
              );
            dataTosStore = jsonData.map((local, index) => {
              return {
                ...local,
                id: index,
              };
            });
            this.disableNext = false;

            this._uploadCapacitiesStoreService.setStoreList(dataTosStore);
          });
      } catch (error) {
        return this._alertService.alertError(
          'El documento que intentas cargar, no cumple con los parámetros. Por favor, asegúrate que contenga la plantilla indicada para la carga de capacidades por defecto.'
        );
      }
    };

    reader.readAsBinaryString(file);
  }
  onChangeInput() {
    this.inputRef.nativeElement.click();
  }
  nextStep(e: any) {
    if (this.files.length > 0) {
      this._uploadCapacitiesStoreService.setCurrentStep('3');
    }
  }
  cancelStep(e: any) {
    TABS[1].flow = 'pending';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.setStoreList([]);
    this._uploadCapacitiesStoreService.setCurrentStep('1');
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
    return stores.every((item) => this.instanceOfIStoreUpload(item));
  }
}
