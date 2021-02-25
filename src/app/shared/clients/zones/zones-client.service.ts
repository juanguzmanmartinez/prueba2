import { Injectable } from '@angular/core';
import { GenericService } from '@clients/generic/generic.service';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { map, take } from 'rxjs/operators';
import { isArray } from '@helpers/objects-equal.helper';
import { Observable } from 'rxjs';
import { IZone } from '@interfaces/zones/zone.interface';

@Injectable()
export class ZonesClientService {
    private readonly ZONES = EndpointsParameter.GET_ZONES;

    constructor(private generic: GenericService) {
    }

    getZoneList(): Observable<Array<IZone>> {
        return this.generic.genericGet<Array<IZone>>(this.ZONES)
            .pipe(
                take(1),
                map((response: Array<IZone>) => {
                    return isArray(response) ? response : [];
                }));

    }
}
