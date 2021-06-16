import { Component } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { ADMINISTRATOR_ROUTING } from '@parameters/router/routing/administrator-routing.parameter';

@Component({
    selector: 'app-administrator-sidenav',
    templateUrl: './administrator-sidenav.component.html',
    styleUrls: ['./administrator-sidenav.component.scss']
})
export class AdministratorSidenavComponent {

    public innerSidenavExpanded: boolean;
    public routerPath = ROUTER_PATH;
    private administratorRouting = ADMINISTRATOR_ROUTING;

    constructor() {
    }

    operationsInnerSidenavOpened(expanded: boolean) {
        this.innerSidenavExpanded = expanded;
    }

    get sidenavTitle() {
        return this.innerSidenavExpanded ?
            this.administratorRouting.name : this.administratorRouting.shortName;
    }
}
