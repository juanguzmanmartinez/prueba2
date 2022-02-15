import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseUrl } from '@helpers/parse-url.helper';

@Component({
  selector: 'app-back-router-simple',
  templateUrl: './back-router-simple.component.html',
  styleUrls: ['./back-router-simple.component.scss']
})
export class BackRouterSimpleComponent implements OnInit {

  @Input() backRoute: string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (!this.backRoute) {
      this.backRoute = parseUrl(this._router.url, '..');
    }
  }
}
