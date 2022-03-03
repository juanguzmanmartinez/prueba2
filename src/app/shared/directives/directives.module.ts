import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitsOnlyDirective } from './digits-only/digits-only.directive';
import { CapsLockDirective } from './caps-lock/caps-lock.directive';
import { RouterAccessDirective } from './roles/router-access.directive';
import { EditionAccessDirective } from './roles/edition-access.directive';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { SortCustomDirective } from './sort-custom/sort-custom.directive';
import { SearchCharactersDirective } from './search-characters/search-characters.directive';

const DIRECTIVES = [
  DigitsOnlyDirective,
  CapsLockDirective,
  RouterAccessDirective,
  EditionAccessDirective,
  SortCustomDirective,
  SearchCharactersDirective
];

@NgModule({
  declarations: [
    ...DIRECTIVES,
  ],
  exports: [
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,
    DialogModule
  ]
})
export class DirectivesModule {
}
