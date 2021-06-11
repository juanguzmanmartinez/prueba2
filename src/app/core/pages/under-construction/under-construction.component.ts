import { Component, OnInit } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {
  public routerPath = ROUTER_PATH;

  constructor() { }

  ngOnInit(): void {
  }

}
