import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-inner-sidenav-navigation-expansion',
    templateUrl: './inner-sidenav-navigation-expansion.component.html',
    styleUrls: ['./inner-sidenav-navigation-expansion.component.scss']
})
export class InnerSidenavNavigationExpansionComponent implements OnInit, OnDestroy {

    private unsubscribe$ = new Subject<void>();
    public activeRoute: boolean;
    public navigationDisabledChildren: boolean;

    @Input() navigationIcon: string;
    @Input() navigationText: string;
    @Input() navigationRoute: string;
    @Input() navigationRouteOptions: { exact: boolean; } = {exact: true};

    @Input('navigationDisabledChildren')
    set navigationDisabledChildren$(disabled: boolean) {
        this.navigationDisabledChildren = disabled;
        this.openMatExpansionPanel();
    }

    @ViewChild(MatExpansionPanel, {static: true}) matExpansionPanel: MatExpansionPanel;

    constructor(public _router: Router) {
    }

    ngOnInit(): void {
        this.openMatExpansionPanel();
        this._router.events
            .pipe(
                takeUntil(this.unsubscribe$),
                filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.openMatExpansionPanel();
            });
    }

    openMatExpansionPanel() {
        this.activeRoute = this._router.url.includes(this.navigationRoute);
        if (this.activeRoute && !this.navigationDisabledChildren) {
            this.matExpansionPanel.open();
        }
        if (this.navigationDisabledChildren ||
            !this.activeRoute && this.matExpansionPanel && this.matExpansionPanel.expanded) {
            this.matExpansionPanel.close();
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
