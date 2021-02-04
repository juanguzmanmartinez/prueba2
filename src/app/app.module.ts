import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoaderComponent } from '@pages/main-loader/main-loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from '@atoms/icons/icons.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PagesModule } from '@pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '@interceptors/interceptor.providers';
import { InterceptorsServiceModule } from '@interceptors/interceptors-service.module';
import { StoreFactoryModule } from '@stores/store-factory.module';

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
        HttpClientModule,
        IconsModule,
        PagesModule,
        InterceptorsServiceModule,
        StoreFactoryModule.forRoot()
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es'},
        httpInterceptorProviders
    ],
})
export class AppModule {
}
