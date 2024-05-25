import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideHttpClient} from '@angular/common/http';
import {HttpAppInterceptor} from "./services/app-http.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),HttpClientModule,provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpAppInterceptor, multi: true} ]
};
