import {Component, OnInit} from '@angular/core';
import {MainLoaderService} from '../../../../shared/helpers/main-loader.service';

@Component({
  selector: 'app-operations-home',
  templateUrl: './operations-home.component.html',
  styleUrls: ['./operations-home.component.scss']
})
export class OperationsHomeComponent implements OnInit {
  constructor(
    private mainLoaderService: MainLoaderService,
  ) {
  }

  ngOnInit() {
    this.mainLoaderService.isLoaded = false;
  }

}
