import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-sidenav-route-menu',
    templateUrl: './sidenav-route-menu.component.html',
    styleUrls: ['./sidenav-route-menu.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavRouteMenuComponent implements OnInit {
    @Input() routeText: string;
    @Input() routePath: string[] | string;
    @Input() routePathOptions: { exact: boolean } = {exact: true};

    constructor() {
    }

    ngOnInit(): void {
    }
}
