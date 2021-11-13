import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericService } from './generic/generic.service';
import { CapacityClientService } from './capacities/capacity-client.service';
import { DrugstoresClientService } from './drugstores/drugstores-client.service';
import { AuthClientService } from '@clients/auth/auth-client.service';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { ZonesClientService } from '@clients/zones/zones-client.service';
import { ResourceClientService } from '@clients/resource/resource-client.service';
import { UserClientService } from '@clients/users/user-client.service';
import { ReportsClientService } from '@clients/reports/reports-client.service';
import { OrderClientService } from '@clients/order/order-client.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    GenericService,
    CapacityClientService,
    DrugstoresClientService,
    AuthClientService,
    StorageClientService,
    ZonesClientService,
    ResourceClientService,
    UserClientService,
    ReportsClientService,
    OrderClientService
  ]
})
export class ClientsServiceModule {
}
