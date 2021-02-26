import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav/drawer';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-inner-sidenav',
    templateUrl: './inner-sidenav.component.html',
    styleUrls: ['./inner-sidenav.component.scss']
})
export class InnerSidenavComponent implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];

    public innerSidenavMode: MatDrawerMode = 'side';
    public overSidenav: boolean;
    public overSidenavRouteSubscription: Subscription;

    @Output() innerSidenavExpanded = new EventEmitter<boolean>();
    @ViewChild('innerSidenav', {static: true}) matDrawer: MatDrawer;

    constructor(
        public _breakpointObserver: BreakpointObserver,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        const subscription = this._breakpointObserver.observe([
            `(min-width: 1024px)`
        ]).subscribe((state) => {
            this.overSidenav = !state.matches;
            this.innerSidenavMode = this.overSidenav ? 'over' : 'side';
            this.matDrawer.close();
        });

        this.subscriptions.push(subscription);
    }


    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        if (this.overSidenavRouteSubscription && !this.overSidenavRouteSubscription.closed) {
            this.overSidenavRouteSubscription.unsubscribe();
        }
    }

    innerSidenavOpenedEvent() {
        this.innerSidenavExpanded.emit(true);
        if (this.overSidenav) {
            this.routerChangesResponsive();
        }
    }

    innerSidenavClosedEvent() {
        this.innerSidenavExpanded.emit(false);
        if (this.overSidenavRouteSubscription && !this.overSidenavRouteSubscription.closed) {
            this.overSidenavRouteSubscription.unsubscribe();
        }
    }

    routerChangesResponsive() {
        this.overSidenavRouteSubscription = this._router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe(() => {
                this.matDrawer.close();
                this.overSidenavRouteSubscription.unsubscribe();
            });
    }

}
