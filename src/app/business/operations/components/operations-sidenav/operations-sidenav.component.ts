import { Component } from '@angular/core';
import { CONCAT_PATH } from '@parameters/concat-router-path.parameter';

@Component({
    selector: 'app-operations-sidenav',
    templateUrl: './operations-sidenav.component.html',
    styleUrls: ['./operations-sidenav.component.scss']
})
export class OperationsSidenavComponent {

    _operationsSidenavTitle = 'Operaciones';
    innerSidenavExpanded: boolean;
    public concatPath = CONCAT_PATH;

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
