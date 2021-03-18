import { Component, OnInit } from '@angular/core';
import { parseUrl } from '@helpers/parse-url.helper';
import { Router } from '@angular/router';

@Component({
    selector: 'app-operations-stores-edition-service-type',
    templateUrl: './operations-stores-edition-service-type.component.html',
    styleUrls: ['./operations-stores-edition-service-type.component.scss']
})
export class OperationsStoresEditionServiceTypeComponent implements OnInit {

    constructor(
        private _router: Router
    ) {
    }

    ngOnInit(): void {
    }


    cancelServiceTypeEdition() {
        const backRoute = parseUrl(this._router.url, '..');
        this._router.navigate([backRoute]);
    }
}
