import { Component, OnInit } from '@angular/core';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';

@Component({
  selector: 'app-capacity-am-pm',
  templateUrl: './capacity-am-pm.component.html',
  styleUrls: ['./capacity-am-pm.component.scss']
})
export class CapacityAmPmComponent implements OnInit {
  panelOpenState = false;
  labelPosition: 'before' | 'after' = 'after';
  constructor(
    private mainLoaderService: MainLoaderService,
  ) { }

  ngOnInit() {
    this.mainLoaderService.isLoaded = false;

  }

}
