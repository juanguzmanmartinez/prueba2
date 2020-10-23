import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav/drawer';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-inner-sidenav',
  templateUrl: './inner-sidenav.component.html',
  styleUrls: ['./inner-sidenav.component.scss']
})
export class InnerSidenavComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  public innerSidenavMode: MatDrawerMode = 'side';

  @Output() innerSidenavExpanded = new EventEmitter<boolean>();
  @ViewChild('innerSidenav', {static: true}) matDrawer: MatDrawer;

  constructor(
    public _breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    const subscription = this._breakpointObserver.observe([
      `(min-width: 1024px)`
    ]).subscribe((state) => {
      this.innerSidenavMode = !state.matches ? 'over' : 'side';
      this.matDrawer.close();
    });
    this.subscriptions.push(subscription);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  innerSidenavOpenedEvent() {
    this.innerSidenavExpanded.emit(true);
  }

  innerSidenavClosedEvent() {
    this.innerSidenavExpanded.emit(false);
  }

}
