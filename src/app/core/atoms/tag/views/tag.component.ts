import { Component, Input } from '@angular/core';
import {
  ETag,
  ETagAppearance,
  ETypeTag,
  ETypeTagBrand,
  ETypeTagInformative,
  TTagAppearance
} from '@models/tag/tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  public tagAppearance = ETagAppearance;

  @Input() tagColor: ETag | string;
  @Input() type: ETypeTag | string;
  @Input() typeInformative: ETypeTagInformative;
  @Input() typeBrand: ETypeTagBrand;
  @Input() appearance: TTagAppearance = ETagAppearance.transparentPill;

  constructor() { }

}
