import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './page/home-page/home-page.component';
import { SignInComponent } from './page/sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomePageComponent, SignInComponent]
})
export class HomeModule { }
