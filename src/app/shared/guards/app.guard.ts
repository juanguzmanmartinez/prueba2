import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MainLoaderService } from '@pages/main-loader/main-loader.service';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {
    constructor(
        private mainLoaderService: MainLoaderService,
    ) {
    }

    canActivate(): boolean {
        this.mainLoaderService.isLoaded = false;
        return true;
    }

}
