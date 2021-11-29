import { Component, Input } from '@angular/core';
import { ClientInformationModel } from '../../models/client-information.model';

@Component({
  selector: 'app-client-information',
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.scss']
})
export class ClientInformationComponent {

  @Input() dataClient: ClientInformationModel;

  constructor() { }

}
