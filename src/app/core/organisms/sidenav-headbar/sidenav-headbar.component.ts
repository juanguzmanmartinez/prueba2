import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-sidenav-headbar',
    templateUrl: './sidenav-headbar.component.html',
    styleUrls: ['./sidenav-headbar.component.scss'],
})
export class SidenavHeadbarComponent implements OnDestroy {
    public responsive: boolean;
    private subscriptions: Subscription[] = [];


    constructor(
        public _breakpointObserver: BreakpointObserver,
    ) {

        const subscription = this._breakpointObserver.observe([
            `(min-width: 768px)`
        ]).subscribe((state) => {
            this.responsive = !state.matches;
        });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
