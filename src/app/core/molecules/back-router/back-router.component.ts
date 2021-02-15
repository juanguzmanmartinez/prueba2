import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseUrl } from '@helpers/parse-url.helper';

@Component({
    selector: 'app-back-router',
    templateUrl: './back-router.component.html',
    styleUrls: ['./back-router.component.scss']
})
export class BackRouterComponent implements OnInit {

    public backRoute: string;

    constructor(
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.backRoute = parseUrl(this._router.url, '..');
    }

}
