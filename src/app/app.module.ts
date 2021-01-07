import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoaderComponent } from '@pages/main-loader/main-loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { IconsModule } from '@atoms/icons/icons.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PagesModule } from '@pages/pages.module';

@NgModule({
  bootstrap: [
    AppComponent,
    MainLoaderComponent
  ],
  declarations: [
    AppComponent,
    MainLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    IconsModule,
    PagesModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
  ],
})
export class AppModule {
}
