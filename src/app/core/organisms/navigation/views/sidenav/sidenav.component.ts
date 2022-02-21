import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from '@organisms/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  private subscriptions: Subscription[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.openSidenavEvent();
    this.closeSidenavEvent();
  }

  openSidenavEvent() {
    const subscription = this.navigationService.openSidenav$.subscribe(() => {
      this.sidenav.open();
    });

    this.subscriptions.push(subscription);
  }

  closeSidenavEvent() {
    const subscription = this.navigationService.closeSidenav$.subscribe(() => {
      this.sidenav.close();
    });

    this.subscriptions.push(subscription);
  }

  sidenavOpened() {
    this.navigationService.sidenavOpened = true;
    this.sidenav.open();
  }

  sidenavClosed() {
    this.navigationService.sidenavClosed = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
