import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './services/auth-guard/auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
  ],
  declarations: []
})
export class SharedModule { }
