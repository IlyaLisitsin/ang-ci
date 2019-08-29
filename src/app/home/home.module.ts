import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './page/home-page/home-page.component';
import { SignInPageComponent } from './page/sign-in-page/sign-in-page.component';
import { MaterialModule } from '../material.module';
import { HomeService } from './services/home/home.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    HomePageComponent,
    SignInPageComponent
  ],
  providers: [
    HomeService
  ]

})
export class HomeModule { }
