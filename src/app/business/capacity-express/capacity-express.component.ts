import { Component, OnInit } from '@angular/core';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';

@Component({
  selector: 'app-capacity-express',
  templateUrl: './capacity-express.component.html',
  styleUrls: ['./capacity-express.component.scss']
})
export class CapacityExpressComponent implements OnInit {
  panelOpenState = false;
  labelPosition: 'before' | 'after' = 'after';
  constructor(
    private mainLoaderService: MainLoaderService,
  ) { }

  ngOnInit() {
    this.mainLoaderService.isLoaded = false;

  }

}
