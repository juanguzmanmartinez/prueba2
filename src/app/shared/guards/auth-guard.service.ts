import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {MainLoaderService} from '../helpers/main-loader.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private mainLoaderService: MainLoaderService,
  ) {
  }

  canActivate(): boolean {
    this.mainLoaderService.isLoaded = false;
    return true;
  }

}
