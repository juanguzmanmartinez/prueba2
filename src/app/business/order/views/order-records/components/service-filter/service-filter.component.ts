import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CDeliveryServiceTypeName } from '@models/service-type/delivery-service-type.model';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { ServicesFilterEvent } from '../../interfaces/order-records.interface';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.scss'],
})
export class ServiceFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<ServicesFilterEvent>();

  services = [];

  list = Object.keys(CDeliveryServiceTypeName).map((value) => {
    this.services.push(value);
    return { code: value, name: CDeliveryServiceTypeName[value] };
  });

  valueSelect: string;
  selectedService: string[];

  constructor(private orderFilterStore: OrderFilterStore) {}

  ngOnInit(): void {
    const { typeServices } = this.orderFilterStore.getOrderFilter();
    this.selectedService = typeServices ?? [];

    this.selectionChange(typeServices ?? [], true);
  }

  selectionChange(services: string[], isOnInit = false): void {
    this.selectedService = services;
    if (services.length === 1) {
      this.valueSelect = this.getServiceName(services[0]);
    } else if (services.length === 2) {
      this.valueSelect = `${this.getServiceName(
        services[0]
      )}, ${this.getServiceName(services[1])}`;
    } else if (services.length > 2) {
      this.valueSelect = `${this.getServiceName(
        services[0]
      )}, ${this.getServiceName(services[1])} (+${services.length - 2} otros`;
    }

    if (isOnInit) return;
    this.filter.emit({ services, notFound: this.getServicesName(services) });
  }

  getServiceName(option: string): string {
    return this.list.find((service) => service.code === option).name;
  }

  private getServicesName(services: string[]): string {
    const servicesWithName = services.map((value) => {
      return this.getServiceName(value);
    });
    return servicesWithName.toString();
  }
}
