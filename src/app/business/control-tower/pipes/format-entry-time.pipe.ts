import { Pipe, PipeTransform } from '@angular/core';
import { formatHour } from '../util/format-dates.function';

@Pipe({
  name: 'formatEntryTime',
})
export class FormatEntryTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value === '-') return value;
    const splitted = value.split(' ');
    const hourFormat = formatHour(splitted[1]);
    return hourFormat;
  }
}
