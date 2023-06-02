import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { routeDB } from '../../../../constants/route.constant';

@Component({
  selector: 'app-detail-route-dialog',
  templateUrl: './detail-route-dialog.component.html',
  styleUrls: ['./detail-route-dialog.component.scss'],
})
export class DetailRouteDialogComponent {
  @ViewChild('dialogContainer') dialogContainer: ElementRef;
  detailRouteDB = routeDB;
}
