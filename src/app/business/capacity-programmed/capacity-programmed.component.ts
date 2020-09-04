import { Component, OnInit } from '@angular/core';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';

@Component({
  selector: 'app-capacity-programmed',
  templateUrl: './capacity-programmed.component.html',
  styleUrls: ['./capacity-programmed.component.scss']
})
export class CapacityProgrammedComponent implements OnInit {
  panelOpenState = false;
  labelPosition: 'before' | 'after' = 'after';
  constructor(
    private mainLoaderService: MainLoaderService,
  ) { }

  ngOnInit() {
    this.mainLoaderService.isLoaded = false;

  }

}
