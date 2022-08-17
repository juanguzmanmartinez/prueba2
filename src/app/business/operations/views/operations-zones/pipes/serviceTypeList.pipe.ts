import { Pipe, PipeTransform } from '@angular/core';
import { EChannel } from '@models/channel/channel.model';
import { ZonesChannelServiceTypeRegistered, ZoneServiceType, ZoneServiceTypeRegistered } from '../models/operations-zones-service-type.model';

@Pipe({ name: 'channelFilter' })
export class ServiceTypePipe implements PipeTransform {
  transform(
    value: ZonesChannelServiceTypeRegistered[],
    channels: string[]
  ): ZonesChannelServiceTypeRegistered[] {
    if (!channels || channels.length === 0) {
      return value;
    }
    return value.filter((service) => {
      return !!channels.find((channel) => service.channel === channel);
    });
  }
}
@Pipe({ name: 'companyFilter' })
export class ServiceByCompanyPipe implements PipeTransform {
  transform(value: ZoneServiceTypeRegistered[], companies: string[]): ZoneServiceTypeRegistered[] {
    if (!companies || companies.length === 0) {
      return value;
    }
    
    return value.filter((service) => {
      return !!companies.find((code) => service.company === code);
    });
  }
}
