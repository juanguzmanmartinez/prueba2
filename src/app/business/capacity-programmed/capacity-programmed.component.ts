import { Component, OnInit } from '@angular/core';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';
import { take } from 'rxjs/internal/operators/take';
import { CapacityImplementService } from '../capacity-am-pm/services/capacity-implements.service';
import { CapacityAmPmService } from '../capacity-am-pm/operations-forms/capacity-am-pm-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capacity-programmed',
  templateUrl: './capacity-programmed.component.html',
  styleUrls: ['./capacity-programmed.component.scss']
})
export class CapacityProgrammedComponent implements OnInit {

  selectedVal: string;
  modeEdition: string;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
  serviceType: string;

  constructor(
    private mainLoaderService: MainLoaderService,
    private service: CapacityImplementService,
    public formService: CapacityAmPmService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.mainLoaderService.isLoaded = false;
    this.selectedVal = 'group';
    this.modeEdition = 'default';


    this.formService.radioControl.setValue('default');
    const radioSubs = this.formService.radioControl.valueChanges
      .subscribe(edition => {
        this.modeEdition = edition;
      });
  }

  public onValChange(val: string) {
    this.selectedVal = val;
    if (val === 'group') {
      // this.service.getLocalImplements$().subscribe(valor => {
      //   console.log(valor);
      // });
      console.log('1');
    } else if (val === 'local') {
      console.log('2');
      this.serviceType = '/PROG';
      this.service.getLocalImplements$(this.serviceType)
        .pipe(take(1))
        .subscribe(value => {
          console.log('ingreso?');

        });
    }
  }

  nextOne() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;

  }

  nextTwo() {
    if (this.modeEdition === 'default') {
      console.log('mode 1');

    } else if (this.modeEdition === 'calendar') {
      console.log('mode 2');

    }

    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
  }

  return() {
    this.router.navigate(['/capacity-manager']);
  }
}
