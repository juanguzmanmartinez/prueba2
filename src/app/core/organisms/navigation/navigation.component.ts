import { Component, OnInit } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  public routerPath = ROUTER_PATH;

  constructor() {
  }

  ngOnInit(): void {
  }

}
