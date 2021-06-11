import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { parseUrl } from '@helpers/parse-url.helper';

@Injectable()
export class RouterHelperService {
    constructor(
        private _router: Router
    ) {
    }

    reloadRoute(route) {
        this._router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => this._router.navigate([route]));
    }

    backRoute() {
        const backRoute = parseUrl(this._router.url, '..');
        return this._router.navigate([backRoute]);
    }
}
