import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './page/home-page/home-page.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    HomePageComponent,
    SignInComponent
  ],
  providers: []

})
export class HomeModule { }
