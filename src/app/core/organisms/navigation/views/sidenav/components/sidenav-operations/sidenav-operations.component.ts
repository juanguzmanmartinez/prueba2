import { Component, Input, OnInit } from '@angular/core';
import { OPERATIONS_ROUTER } from '@parameters/router/routing/operations/operations-router.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav-operations',
    templateUrl: './sidenav-operations.component.html',
    styleUrls: ['./sidenav-operations.component.sass']
})
export class SidenavOperationsComponent implements OnInit {

    public routerPath = ROUTER_PATH;
    public sidenavRouting = OPERATIONS_ROUTER;
    @Input() sidenav: MatSidenav;

    constructor() {
    }

    ngOnInit(): void {
    }

}
