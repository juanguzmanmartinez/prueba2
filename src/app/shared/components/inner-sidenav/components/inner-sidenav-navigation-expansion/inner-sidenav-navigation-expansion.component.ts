import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatExpansionPanel} from '@angular/material/expansion';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-inner-sidenav-navigation-expansion',
  templateUrl: './inner-sidenav-navigation-expansion.component.html',
  styleUrls: ['./inner-sidenav-navigation-expansion.component.scss']
})
export class InnerSidenavNavigationExpansionComponent implements OnInit, OnDestroy {

  @Input() navigationIcon: string;
  @Input() navigationText: string;
  @Input() navigationRoute: string;
  @Input() navigationRouteOptions: { exact: boolean; } = {exact: true};

  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel;

  private unsubscribe$ = new Subject<void>();
  public activeRoute: boolean;

  constructor(public router: Router) {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute = this.router.url.includes(this.navigationRoute);
        if (!this.activeRoute && this.matExpansionPanel && this.matExpansionPanel.expanded) {
          this.matExpansionPanel.close();
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
