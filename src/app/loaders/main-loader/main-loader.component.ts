import { Component } from '@angular/core';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';

@Component({
  selector: 'app-main-loader',
  templateUrl: './main-loader.component.html',
  styleUrls: ['./main-loader.component.sass']
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
