import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '@organisms/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headbar-modules-menu',
  templateUrl: './headbar-modules-menu.component.html',
  styleUrls: ['./headbar-modules-menu.component.sass']
})
export class HeadbarModulesMenuComponent implements OnInit, OnDestroy {

  public sidenavOpened: boolean;
  private subscriptions = new Subscription();

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.sidenavOpenedEvent();
    this.sidenavClosedEvent();
  }

  toggleSidenav(): void {
    if (this.sidenavOpened) {
      this.navigationService.closeSidenav = true;
      this.sidenavOpened = false;
    } else {
      this.navigationService.openSidenav = true;
      this.sidenavOpened = true;
    }
  }

  sidenavOpenedEvent(): void {
    const subscription = this.navigationService.sidenavOpened$
      .subscribe(() => {
        this.sidenavOpened = true;
      });

    this.subscriptions.add(subscription);
  }

  sidenavClosedEvent(): void {
    const subscription = this.navigationService.sidenavClosed$
      .subscribe(() => {
        this.sidenavOpened = false;
      });

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
