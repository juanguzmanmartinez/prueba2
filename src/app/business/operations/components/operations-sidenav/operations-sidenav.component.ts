import { Component } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OPERATIONS_ROUTING } from '@parameters/router/routing/operations-routing.parameter';

@Component({
    selector: 'app-operations-sidenav',
    templateUrl: './operations-sidenav.component.html',
    styleUrls: ['./operations-sidenav.component.scss']
})
export class OperationsSidenavComponent {

    public innerSidenavExpanded: boolean;
    public routerPath = ROUTER_PATH;

    private operationRouting = OPERATIONS_ROUTING;

    constructor() {
    }

    operationsInnerSidenavOpened(expanded: boolean) {
        this.innerSidenavExpanded = expanded;
    }

    get sidenavTitle() {
        return this.innerSidenavExpanded ?
            this.operationRouting.name : this.operationRouting.shortName;
    }
}
