import { Pipe, PipeTransform } from '@angular/core';
import { formatHour } from '../util/format-dates.function';

@Pipe({
  name: 'formatPaused',
})
export class FormatPausedPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '-') return value;
    if (value.toLowerCase() === 'no') return 'No';
    const splitted = value.split(' ');
    const hourFormat = formatHour(splitted[1]);
    return `Desde ${hourFormat}`;
  }
}
