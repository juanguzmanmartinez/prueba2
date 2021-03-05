import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoaderComponent } from '@pages/main-loader/main-loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PagesModule } from '@pages/pages.module';
import { IconsRegistryModule } from '@atoms/icons/icons-registry.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '@interceptors/interceptor.providers';
import { InterceptorsServiceModule } from '@interceptors/interceptors-service.module';
import { StoreFactoryModule } from '@stores/store-factory.module';
import { GuardServiceModule } from '@guards/guard-service.module';
import { ListenerFactoryModule } from './shared/listeners/listener-factory.module';

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
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        StoreFactoryModule.forRoot(),
        ListenerFactoryModule.forRoot(),
        GuardServiceModule,
        AppRoutingModule,
        InterceptorsServiceModule,
        IconsRegistryModule,
        PagesModule,
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es'},
        httpInterceptorProviders
    ],
})
export class AppModule {
}
