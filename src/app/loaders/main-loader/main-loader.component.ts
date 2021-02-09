import { Component } from '@angular/core';
// import { MainLoaderService } from '../../shared/helpers/main-loader.service';
import { MainLoaderService } from '@helpers/main-loader.service';

@Component({
  selector: 'app-main-loader',
  templateUrl: './main-loader.component.html',
  styleUrls: ['./main-loader.component.scss']
})
export class MainLoaderComponent {

  public isLoaded = true;

  constructor(
    private mainLoaderService: MainLoaderService,
  ) {
    this.mainLoaderService.isLoaded$.subscribe(isLoaded => {
      this.isLoaded = isLoaded;
    });
  }

}
