import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {MainLoaderService} from '../helpers/main-loader.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private mainLoaderService: MainLoaderService,
    public _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) {
  }

  canActivate(): boolean | Observable<boolean> {
    this.mainLoaderService.isLoaded = false;
    return this._breakpointObserver.observe([
      `(min-width: 768px)`
    ]).pipe(
      switchMap((state) => {
        if (state.matches) {
          return of(true);
        } else {
          return this._router.navigateByUrl(`/sin-soporte`);
        }
      })
    );
  }

}
