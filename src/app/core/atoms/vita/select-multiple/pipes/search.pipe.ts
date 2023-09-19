// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { ISelectOption } from '@interfaces/vita/select.interface';

@Pipe({
  name: 'search',
  pure: true,
})
export class SearchPipe implements PipeTransform {
  transform(items: ISelectOption[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return item.label.toLowerCase().includes(searchText);
    });
  }
}
