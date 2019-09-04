import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AuthGuard } from './services/auth-guard/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    SpinnerComponent,
  ],
  providers: [
    AuthGuard,
    AuthService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],
  declarations: [
    SpinnerComponent,
  ]
})
export class SharedModule {
}
