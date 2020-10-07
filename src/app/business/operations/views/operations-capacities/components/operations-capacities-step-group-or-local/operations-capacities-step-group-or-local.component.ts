import {Component, OnInit} from '@angular/core';
import {ICustomSelectOption} from '../../../../../../commons/interfaces/custom-controls.interface';

@Component({
  selector: 'app-operations-capacities-step-group-or-local',
  templateUrl: './operations-capacities-step-group-or-local.component.html',
  styleUrls: ['./operations-capacities-step-group-or-local.component.scss']
})
export class OperationsCapacitiesStepGroupOrLocalComponent implements OnInit {


  public groupOrLocalExpanded = true;
  public groupOrLocalTabList: Array<'Grupo' | 'Local'> = ['Grupo', 'Local'];
  public groupOrLocalList: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public groupOrLocalSelection: ICustomSelectOption;

  constructor() {
  }

  ngOnInit(): void {
    this.getGroupOrLocalList(this.groupOrLocalTabList[0]);
  }


  saveGroupOrLocal() {
    this.groupOrLocalExpanded = false;
  }

  changeGroupOrLocal(event) {
    this.getGroupOrLocalList(event.target.value);
  }

  getGroupOrLocalList(groupOrLocalTabSelected: 'Grupo' | 'Local') {
    switch (groupOrLocalTabSelected) {
      case 'Grupo':
        console.log('Group tab');
        break;
      case 'Local':
        this.getLocalList();
        break;
    }
  }

  getLocalList() {
    console.log('getList');
  }

  groupOrLocalSelected(value: ICustomSelectOption) {
    console.log(value);
    this.groupOrLocalSelection = value;
  }

}
