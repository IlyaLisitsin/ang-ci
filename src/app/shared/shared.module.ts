import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './services/auth-guard/auth.guard';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
  ],
  declarations: []
})
export class SharedModule { }
