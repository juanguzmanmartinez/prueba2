import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IconsSvgModel } from '@atoms/icons/models/icons-svg.model';
import { ICONS_SVG } from '@atoms/icons/constants/icons-svg';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    imports: [
        HttpClientModule
    ]
})
export class IconsRegistryModule {

    private iconsSvg: IconsSvgModel[] = ICONS_SVG;

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.iconsSvg.forEach(icon => {
            this.matIconRegistry.addSvgIcon(
                icon.name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
            );
        });
    }
}
