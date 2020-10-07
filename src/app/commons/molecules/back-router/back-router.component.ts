import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {parseUrl} from '../../../shared/helpers/parse-url.helper';

@Component({
  selector: 'app-back-router',
  templateUrl: './back-router.component.html',
  styleUrls: ['./back-router.component.scss']
})
export class BackRouterComponent implements OnInit {

  public backRoute: string;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.backRoute = parseUrl(this.router.url, '..');
  }

}
