import { Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTER_LIST } from '@parameters/router/router.parameter';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CORE_ROUTER } from '@parameters/router/routing/core/core-router.parameter';
import { TRouter } from '@models/auth/router.model';

@Component({
  selector: 'app-headbar-breadcrumbs',
  templateUrl: './headbar-breadcrumbs.component.html',
  styleUrls: ['./headbar-breadcrumbs.component.sass']
})
export class HeadbarBreadcrumbsComponent implements OnInit, OnDestroy {

  public routerList = ROUTER_LIST;
  public baseRouter = CORE_ROUTER.base;
  public childRouter: TRouter;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.getChildRouter();
    this._router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getChildRouter();
      });
  }

  getChildRouter() {
    const urlTree = this._router.url.split('/');
    this.childRouter = this.routerList
      .find((router) => router.path === urlTree[1]);

  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
