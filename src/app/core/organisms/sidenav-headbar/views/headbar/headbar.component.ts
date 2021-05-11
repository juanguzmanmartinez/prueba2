import { Component, OnInit } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.sass']
})
export class HeadbarComponent implements OnInit {

  public routerPath = ROUTER_PATH;

  constructor() { }

  ngOnInit(): void {
  }

}
