import { Component, HostListener, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { DocumentListener } from './shared/listeners/document.listener';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    private subscriptions: Subscription[] = [];

    public notSupport: boolean;

    @HostListener('document:click', ['$event'])
    documentClick(event: any): void {
        this._documentListener.click = event.target;
    }

    @HostListener('document:mouseover', ['$event'])
    documentMouseover(event: any): void {
        this._documentListener.mouseover = event.target;
    }

    constructor(
        private _breakpointObserver: BreakpointObserver,
        private _documentListener: DocumentListener
    ) {

        const subscription = this._breakpointObserver.observe([
            `(min-width: 768px)`
        ]).subscribe((state) => {
            this.notSupport = !state.matches;
        });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
