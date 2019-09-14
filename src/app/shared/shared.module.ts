import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AuthGuard } from './services/auth-guard/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from '../material.module';
import { StepperComponent } from './components/stepper/stepper.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ViewDirective } from './directives/view.directive';
import { TestComponent } from './components/test/test.component';
import {UploadImageComponent} from "../home/components/upload-image/upload-image.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    SpinnerComponent,
    StepperComponent,
  ],
  providers: [
    AuthGuard,
    AuthService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],
  declarations: [
    SpinnerComponent,
    StepperComponent,
    ViewDirective,
    TestComponent,
  ],
  entryComponents: [
    UploadImageComponent,
    TestComponent,
  ],
})
export class SharedModule {
}
