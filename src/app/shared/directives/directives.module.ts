import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { AmountReverseDirective } from './amount-reverse/amount-reverse.directive';
import { CapsLockDirective } from './caps-lock/caps-lock.directive';
import { DigitsOnlyDirective } from './digits-only/digits-only.directive';
import { NoSpaceDirective } from './no-space/no-space.directive';
import { ResizedDirective } from './resize/resize.directive';
import { EditionAccessDirective } from './roles/edition-access.directive';
import { RouterAccessDirective } from './roles/router-access.directive';
import { SearchCharactersDirective } from './search-characters/search-characters.directive';
import { SortCustomDirective } from './sort-custom/sort-custom.directive';

const DIRECTIVES = [
  DigitsOnlyDirective,
  CapsLockDirective,
  RouterAccessDirective,
  EditionAccessDirective,
  SortCustomDirective,
  SearchCharactersDirective,
  NoSpaceDirective,
  ResizedDirective,
  AmountReverseDirective
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
