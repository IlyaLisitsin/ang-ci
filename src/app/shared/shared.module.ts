import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './services/auth-guard/auth.guard';
import { LoginService } from './services/login/login.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    LoginService,
  ],
  declarations: []
})
export class SharedModule { }
