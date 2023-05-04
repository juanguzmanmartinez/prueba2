import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';

@Component({
  selector: 'app-allocation-routing',
  templateUrl: './allocation-routing.component.html',
  styleUrls: ['./allocation-routing.component.scss'],
})
export class AllocationRoutingComponent {
  constructor(private router: Router) {}
  directToManualrouting(idLocal: string) {
    this.router.navigate([CT_ROUTER_PATH.ctManualRouting(idLocal)]);
  }
}
