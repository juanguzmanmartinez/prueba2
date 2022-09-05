import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-step-file-upload',
  templateUrl: './op-capacities-step-file-upload.component.html',
  styleUrls: ['./op-capacities-step-file-upload.component.scss'],
})
export class OpCapacitiesStepFileUploadComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;

  dato: any;
  files: any[] = [];
  dataSource = [];
  fileName: string = '';
  textButton = 'Regresar';
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  selectionChange(ev) {
    console.log('e', ev);
  }

  fileBrowseHandler(ev: any) {
    this.fileName = ev.target.files[0].name;
    this.files.push(ev.target.files[0]);
    let workBook = null;
    let jsonData = null;
    let dataString;
    const reader = new FileReader();
    const file = ev.target.files[0];
    let qqq = [];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      dataString = JSON.stringify(jsonData);
      qqq = jsonData.Sheet1.map((local, index) => {
        return {
          ...local,
          id: index,
        };
      });
      let datoss: any[] = [];
      jsonData.Sheet1.forEach((item) => {
        let found = datoss.some((it) => it.code == item.CodLocal);
        if (!found) {
          datoss.push({
            code: item.CodLocal,
            local: item.Local,
            ampm: [],
            scheduled: [],
            express: [],
            ret: [],
          });
        }
        let finddd = datoss.find((ol) => ol.local === item.Local);

        // console.log('econtrado', finddd);
        if (finddd) {
          switch (item.Servicio) {
            case 'PROG':
              finddd.scheduled.push({
                segment: item.SegmentoHorario,
                capacity: item.Capacidad,
              });
              break;
            case 'AM/PM':
              finddd.ampm.push({
                segment: item.SegmentoHorario,
                capacity: item.Capacidad,
              });
              break;
            case 'EXP':
              finddd.express.push({
                segment: item.SegmentoHorario,
                capacity: item.Capacidad,
              });
              break;
            case 'RET':
              finddd.ret.push({
                segment: item.SegmentoHorario,
                capacity: item.Capacidad,
              });
              break;
          }
        }
      });
      this.dato = dataString;
      let ampmCap = 0;
      let expCap = 0;
      let scheCap = 0;
      let retCap = 0;
      datoss.forEach((pla: any) => {
        ampmCap = pla.ampm.reduce((a, { capacity }) => {
          return a + capacity;
        }, 0);
        expCap = pla.express.reduce((a, { capacity }) => {
          return a + capacity;
        }, 0);
        scheCap = pla.scheduled.reduce((a, { capacity }) => {
          return a + capacity;
        }, 0);
        retCap = pla.ret.reduce((a, { capacity }) => {
          return a + capacity;
        }, 0);
        pla.ampmTotalCapacity = ampmCap;
        pla.expTotalCapacity = expCap;
        pla.scheTotalCapacity = scheCap;
        pla.retTotalCapacity = retCap;
      });

      this.dataSource = datoss;
      this._uploadCapacitiesStoreService.setStoreList(qqq);
    };

    reader.readAsBinaryString(file);
  }
  onChangeInput() {
    this.inputRef.nativeElement.click();
  }
  nextStep(e: any) {
    this._uploadCapacitiesStoreService.setCurrentStep('3');
  }
  cancelStep(e: any) {
    this._uploadCapacitiesStoreService.setCurrentStep('1');
  }
}
