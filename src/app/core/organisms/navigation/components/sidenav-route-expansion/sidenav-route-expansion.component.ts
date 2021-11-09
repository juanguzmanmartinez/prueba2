import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { state, style, trigger } from '@angular/animations';

@Component({
    selector: 'app-sidenav-route-expansion',
    templateUrl: './sidenav-route-expansion.component.html',
    styleUrls: ['./sidenav-route-expansion.component.sass'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('openClose', [
            state('open', style({
                transform: 'rotate(0deg)'
            })),
            state('closed', style({
                transform: 'rotate(-180deg)'
            }))
        ]),
    ],
})
export class SidenavRouteExpansionComponent implements OnInit, OnDestroy {

    private unsubscribe$ = new Subject<void>();
    public activeRoute: boolean;
    public disableChildren: boolean;
    public activeHeaderRoute: boolean;
    public sidenavRouteExpansionState = false;

    @Input() routeIcon: string;
    @Input() routeText: string;
    @Input() routePath: string;
    @Input() routePathOptions: { exact: boolean; } = {exact: true};

    @Input('disableChildren')
    set disableChildren$(disabled: boolean) {
        this.disableChildren = disabled;
        this.toggleMatExpansionPanel();
        this.toggleHeaderRoute();
    }

    @ViewChild(MatExpansionPanel, {static: true}) matExpansionPanel: MatExpansionPanel;

    constructor(public _router: Router) {
    }

    ngOnInit(): void {
        this.toggleMatExpansionPanel();
        this.toggleHeaderRoute();

        this._router.events
            .pipe(
                takeUntil(this.unsubscribe$),
                filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.toggleMatExpansionPanel();
                this.toggleHeaderRoute();
            });

    }

    toggleMatExpansionPanel() {
        this.activeRoute = this._router.url.includes(this.routePath);
        if (this.activeRoute && !this.disableChildren) {
            this.matExpansionPanel.open();
        }
        if (this.disableChildren ||
            !this.activeRoute && this.matExpansionPanel && this.matExpansionPanel.expanded) {
            this.matExpansionPanel.close();
        }
    }

    toggleHeaderRoute() {
        const matchOptions: IsActiveMatchOptions = this.routePathOptions.exact ?
            {paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored'} :
            {paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored'};
        this.activeHeaderRoute = this._router.isActive(this.routePath, matchOptions);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
