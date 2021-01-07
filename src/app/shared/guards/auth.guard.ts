import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MainLoaderService } from '@pages/main-loader/main-loader.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private mainLoaderService: MainLoaderService,
  ) {
  }

  canActivate(): boolean | Observable<boolean> {
    this.mainLoaderService.isLoaded = false;
    return true;
  }

}
