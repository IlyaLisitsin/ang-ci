import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AuthGuard } from './services/auth-guard/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],
  declarations: []
})
export class SharedModule {
}
