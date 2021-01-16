import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoaderComponent } from '@pages/main-loader/main-loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from '@atoms/icons/icons.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PagesModule } from '@pages/pages.module';
import { ErrorInterceptor } from '@clients/generic/error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@clients/generic/auth-interceptor.service';

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
        IconsModule,
        PagesModule
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es'},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
})
export class AppModule {
}
