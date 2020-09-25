import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-href',
  templateUrl: './href.component.html',
  styleUrls: ['./href.component.sass']
})
export class HrefComponent {
  @Input()
  hrefClass: string;

  @Input()
  hrefUrl: string;

  @Input()
  hrefTarget: '_blank' | '_self' | '_parent' | '_top' | 'framename' = '_self';


}
