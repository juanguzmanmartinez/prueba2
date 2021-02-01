import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public subscriptions: Subscription[] = [];

  public notSupport: boolean;

  constructor(
    public _breakpointObserver: BreakpointObserver,
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
