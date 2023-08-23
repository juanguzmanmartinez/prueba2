import H from '@here/maps-api-for-javascript';
import { OrderNameFile, OrderStatusColor } from '../constants/order.constant';
import { IOrder } from '../interfaces/order.interface';
import { OrderRoute } from '../models/order-route.model';
import { PointRoute } from '../models/point-route.model';

export function svgPointIcon(text: string, fill: string): string {
  return (
    '<svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<style>.small {font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 12px; font-weight: 600; line-height: 18px; font-style: normal;} .cursor-pointer {cursor: pointer;}</style>' +
    `<path class="cursor-pointer" fill-rule="evenodd" clip-rule="evenodd" d="M0 14.0424C0 6.30098 6.28014 0 13.9995 0C21.7199 0 28 6.30098 28 14.0424C28 23.8902 16.3351 33.4868 13.9995 34C11.664 33.4888 0 23.8922 0 14.0424Z" fill="${fill}"/>` +
    `<text x="50%" y="19" text-anchor="middle" font-weight="bold" class="small" line-height="1.5" fill="#fff">${text}</text>` +
    '</svg>'
  );
}

export function divPointIcon(text: string, nameFile: string): string {
  return (
    '<div style="position:relative; cursor:pointer;">' +
    `<img src="/assets/icons/${nameFile}.svg" style="width:100%; height:auto;"/>` +
    `<span class="text-body-3-bold text-neutral-0" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">${text}</span>` +
    '</div>'
  );
}

export function pointIcon(point: PointRoute) {
  const text = point.data?.orderNumber;
  const fill = OrderStatusColor[point.data?.state] || '#304165';
  return new H.map.Icon(svgPointIcon(text, fill));
}

export function pointDomIcon(point: PointRoute) {
  const text = point.data.orderNumber;
  const nameFile = OrderNameFile[point.data.state];
  return new H.map.DomIcon(divPointIcon(text, nameFile));
}

export function storeIcon() {
  return new H.map.Icon('/assets/icons/store-inkafarma.svg');
}
