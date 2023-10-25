import { Component, Input } from '@angular/core';
import { DetailRouteState } from '../../../../interfaces/route.interface';
import { colorRouteTimeline, routeState } from '../../../../constants/route.constant';

@Component({
  selector: 'app-detail-route-state',
  templateUrl: './detail-route-state.component.html',
  styleUrls: ['./detail-route-state.component.scss'],
})
export class DetailRouteStateComponent {
  @Input() route: DetailRouteState;
  routeState = routeState;
  colorRouteTimeline = colorRouteTimeline;
}
