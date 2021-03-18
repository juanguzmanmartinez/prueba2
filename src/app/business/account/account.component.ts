import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnDestroy {
    public subscriptions: Subscription[] = [];

    public logoWidth = '348px';

    constructor(
        public _breakpointObserver: BreakpointObserver,
    ) {

        const subscription = this._breakpointObserver.observe([
            `(min-width: 768px)`
        ]).subscribe((state) => {
            const responsive = !state.matches;
            this.logoWidth = responsive ? '250px' : '348px';
        });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
