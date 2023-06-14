import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';
import { OrderStore } from '../../store/order.store';
import { SameLocalDialogService } from './components/same-local-dialog/same-local-dialog.service';

@Component({
  selector: 'app-allocation-routing',
  templateUrl: './allocation-routing.component.html',
  styleUrls: ['./allocation-routing.component.scss'],
})
export class AllocationRoutingComponent {
  public routerPath = ROUTER_PATH;
  public isErrorTab: boolean = true;

  constructor(
    private router: Router,
    private orderStore: OrderStore,
    private dialog: SameLocalDialogService
  ) {}

  directToManualrouting(idLocal: string) {
    if (this.hasSameLocal()) {
      this.openDialog();
    } else {
      this.router.navigate([CT_ROUTER_PATH.ctManualRouting(idLocal)]);
    }
  }

  hasSameLocal() {
    const errorOrders = this.orderStore.value['selectedErrorOrders'];
    const firstLocal = errorOrders[0].local;
    const otherLocal = errorOrders.find((order) => order.local !== firstLocal);
    return !!otherLocal;
  }

  changeTab(isErrorTab: boolean) {
    this.isErrorTab = isErrorTab;
  }

  openDialog(): void {
    this.dialog.open().afterClosed().subscribe();
  }

  get hasSelected(): boolean {
    return !!this.orderStore.value['selectedErrorOrders']?.length;
  }
}
