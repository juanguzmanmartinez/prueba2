import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSearchComponent } from './select-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IconsModule } from '../icons/icons.module';

const COMPONENTS = [
  SelectSearchComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    IconsModule
  ]
})
export class SelectSearchModule {
}
