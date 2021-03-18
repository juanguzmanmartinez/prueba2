import { Component, OnInit } from '@angular/core';
import { parseUrl } from '@helpers/parse-url.helper';
import { Router } from '@angular/router';

@Component({
    selector: 'app-operations-stores-edition-store',
    templateUrl: './operations-stores-edition-store.component.html',
    styleUrls: ['./operations-stores-edition-store.component.scss']
})
export class OperationsStoresEditionStoreComponent implements OnInit {

    constructor(
        private _router: Router
    ) {
    }

    ngOnInit(): void {
    }

    cancelStoreEdition() {
        const backRoute = parseUrl(this._router.url, '..');
        this._router.navigate([backRoute]);
    }

}
