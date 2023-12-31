import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre',
})
export class NombrePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      if (value.trim() === '' || value === 'null') {
        return '-';
      }
      return value;
    }

    return '-';
  }
}
