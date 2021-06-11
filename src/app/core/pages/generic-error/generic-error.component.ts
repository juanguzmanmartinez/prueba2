import { Component, OnInit } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.scss']
})
export class GenericErrorComponent implements OnInit {
  public routerPath = ROUTER_PATH;

  constructor() { }

  ngOnInit(): void {
  }

}
