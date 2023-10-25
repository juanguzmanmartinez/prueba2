import { Component } from '@angular/core';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';

@Component({
  selector: 'app-manual-routing',
  templateUrl: './manual-routing.component.html',
  styleUrls: ['./manual-routing.component.scss'],
})
export class ManualRoutingComponent {
  get allocationPath(): string {
    return CT_ROUTER_PATH.ctAllocationRouting('1');
  }
}
