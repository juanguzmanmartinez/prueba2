import {Component} from '@angular/core';
import {IconsImplementService} from './commons/core-components/icons/service/icons-implement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _iconsImplement: IconsImplementService,
  ) {
    this._iconsImplement.declareIcons();
  }
}
