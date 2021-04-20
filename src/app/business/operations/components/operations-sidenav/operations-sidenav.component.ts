import { Component } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
    selector: 'app-operations-sidenav',
    templateUrl: './operations-sidenav.component.html',
    styleUrls: ['./operations-sidenav.component.scss']
})
export class OperationsSidenavComponent {

    _operationsSidenavTitle = 'Operaciones';
    innerSidenavExpanded: boolean;
    public concatPath = ROUTER_PATH;

    constructor() {
    }

    operationsInnerSidenavOpened(expanded: boolean) {
        this.innerSidenavExpanded = expanded;
    }

    get operationsSidenavTitle() {
        return this.innerSidenavExpanded ?
            this._operationsSidenavTitle : this._operationsSidenavTitle.slice(0, 2);
    }
}
