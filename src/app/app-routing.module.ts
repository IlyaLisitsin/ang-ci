import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home/page/home-page/home-page.component';
import { AuthGuard } from './shared/services/auth-guard/auth.guard';
import { SignInComponent } from './home/page/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
