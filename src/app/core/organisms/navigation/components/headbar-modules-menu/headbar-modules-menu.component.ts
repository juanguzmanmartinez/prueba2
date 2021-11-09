import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '@organisms/navigation/navigation.service';
import { Subscription } from 'rxjs';
import { state, style, trigger } from '@angular/animations';

@Component({
    selector: 'app-headbar-modules-menu',
    templateUrl: './headbar-modules-menu.component.html',
    styleUrls: ['./headbar-modules-menu.component.sass'],
    animations: [
        trigger('sidenavMenu', [
            state('opened', style({})),
            state('topX', style({
                transform: 'rotate(45deg)',
                transformOrigin: 'left',
                width: '9px'
            })),
            state('hide', style({
                opacity: 0
            })),
            state('bottomX', style({
                transform: 'rotate(-45deg)',
                transformOrigin: 'left',
                width: '9px'
            }))
        ]),
    ]
})
export class HeadbarModulesMenuComponent implements OnInit, OnDestroy {
    public sidenavOpened: boolean;
    private subscriptions: Subscription[] = [];

    constructor(
        private navigationService: NavigationService
    ) {
    }

    ngOnInit(): void {
        this.sidenavOpenedEvent();
        this.sidenavClosedEvent();
    }

    toggleSidenav() {
        if (this.sidenavOpened) {
            this.navigationService.closeSidenav = true;
            this.sidenavOpened = false;
        } else {
            this.navigationService.openSidenav = true;
            this.sidenavOpened = true;
        }
    }

    sidenavOpenedEvent() {
        const subscription = this.navigationService.sidenavOpened$
            .subscribe(() => {
                this.sidenavOpened = true;
            });

        this.subscriptions.push(subscription);
    }

    sidenavClosedEvent() {
        const subscription = this.navigationService.sidenavClosed$
            .subscribe(() => {
                this.sidenavOpened = false;
            });

        this.subscriptions.push(subscription);
    }


    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
