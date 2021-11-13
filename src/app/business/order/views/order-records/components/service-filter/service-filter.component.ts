import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.scss']
})
export class ServiceFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<string[]>();

  list = [
    { code: 'AM_PM', name: 'AM/PM' },
    { code: 'PROG', name: 'Programado' },
    { code: 'EXP', name: 'Express' },
    { code: 'RET', name: 'RET' },
  ];
  services = ['AM_PM', 'PROG', 'EXP', 'RET'];
  valueSelect: string;

  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(services: string[]): void {
    if (services.length === 1) {
      this.valueSelect = this.getServiceName(services[0]);
    } else if (services.length === 2) {
      this.valueSelect = `${this.getServiceName(services[0])}, ${this.getServiceName(services[1])}`;
    } else if (services.length > 2) {
      this.valueSelect = `${this.getServiceName(services[0])}, ${this.getServiceName(services[1])} (+${services.length - 2} otros`;
    }
    console.log(services);
    this.filter.emit(services);
  }

  getServiceName(option: string): string {
    return this.list.find(service => service.code === option).name;
  }

}
