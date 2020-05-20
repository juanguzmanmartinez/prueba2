import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoaderComponent } from './loaders/main-loader/main-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    MainLoaderComponent]
})
export class AppModule { }
