import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ICONS_SVG } from '../constants/icons-svg';
import { IconsSvgModel } from '../models/icons-svg.model';

@Injectable()
export class IconsImplementService {

    private iconsSvg: Array<IconsSvgModel> = ICONS_SVG;

    constructor(
        private _matIconRegistry: MatIconRegistry,
        private _domSanitizer: DomSanitizer
    ) {
    }

    public declareIcons() {
        this.iconsSvg.forEach(icon => {
            this._matIconRegistry.addSvgIcon(
                icon.name,
                this._domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
            );
        });
    }
}
