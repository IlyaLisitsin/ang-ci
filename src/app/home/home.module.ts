import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './page/home-page/home-page.component';
import { SignInPageComponent } from './page/sign-in-page/sign-in-page.component';
import { MaterialModule } from '../material.module';
import { HomeService } from './services/home/home.service';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { UploadImageDialogComponent } from './components/upload-image-dialog/upload-image-dialog.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { FeedComponent } from './components/feed/feed.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    HomePageComponent,
    SignInPageComponent,
    UploadImageComponent,
    UploadImageDialogComponent,
    AccountDetailsComponent,
    FeedComponent
  ],
  entryComponents: [
    UploadImageDialogComponent,
  ],
  providers: [
    HomeService
  ]

})
export class HomeModule { }
