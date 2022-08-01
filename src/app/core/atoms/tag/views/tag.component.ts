import { Component, Input } from '@angular/core';
import {
  ETag,
  ETagAppearance,
  ETypeTagBrand,
  ETypeTagInformative,
  ETypeTagSemantic,
  TTagAppearance,
} from '@models/tag/tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  public tagAppearance = ETagAppearance;

  @Input() tagColor: ETag | string;
  @Input() type: ETypeTagSemantic | string;
  @Input() typeInformative: ETypeTagInformative;
  @Input() typeBrand: ETypeTagBrand;
  @Input() appearance: TTagAppearance = ETagAppearance.transparentPill;
  @Input() innerClass: string = '';

  constructor() {}
}
