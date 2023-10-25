import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-sidenav-route-menu-item',
    templateUrl: './sidenav-route-menu-item.component.html',
    styleUrls: ['./sidenav-route-menu-item.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavRouteMenuItemComponent implements OnInit {

    @Input() routeText: string;
    @Input() routePath: string;
    @Input() routePathOptions: { exact: boolean; } = {exact: true};

    constructor() {
    }

    ngOnInit(): void {
    }

}
