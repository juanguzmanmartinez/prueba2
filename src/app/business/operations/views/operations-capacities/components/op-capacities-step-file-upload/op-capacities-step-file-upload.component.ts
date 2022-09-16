import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStoreUpload } from '@interfaces/capacities/upload-capacities.interface';
import { AlertService } from '@molecules/alert/alert.service';
import * as XLSX from 'xlsx';
import { TABS } from '../../constants/step-tabs.constants';
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
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    TABS[1].flow = 'done';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
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
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      try {
        dataTosStore = jsonData['Plantilla descarga capacidades'].map(
          (local, index) => {
            return {
              ...local,
              id: index,
            };
          }
        );
        this.disableNext = false;
      } catch (error) {
        this._alertService.alertError(
          'Verifique si la plantilla es la correcta'
        );
      }

      this._uploadCapacitiesStoreService.setStoreList(dataTosStore);
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
    console.log("'member' in object", 'member' in object);

    return 'member' in object;
  }

  execute() {
    var a: any = { members: 'foobar', pli: 'ddddddddd' };
    console.log('this.instanceOfA(a)', this.instanceOfIStoreUpload(a));

    if (this.instanceOfIStoreUpload(a)) {
      alert(a.service);
    }
  }
}
