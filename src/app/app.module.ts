import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoaderComponent } from './loaders/main-loader/main-loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { IconsModule } from './commons/core-components/icons/icons.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CoreModule } from './core/core.module';

@NgModule({
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
    CoreModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
  ],
  bootstrap: [
    AppComponent,
    MainLoaderComponent]
})
export class AppModule {
}
