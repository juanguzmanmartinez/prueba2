import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CORE_ROUTER } from '@parameters/router/routing/core/core-router.parameter';

@Component({
  selector: 'app-back-router',
  templateUrl: './back-router.component.html',
  styleUrls: ['./back-router.component.scss'],
})
export class BackRouterComponent implements OnInit {
  @Input() backRoute: string;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (!this.backRoute) {
      this.backRoute = CORE_ROUTER.base.path.valueOf();
    }
  }
}
