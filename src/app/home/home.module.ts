import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { HomePageComponent } from './page/home-page/home-page.component';
import { SignInPageComponent } from './page/sign-in-page/sign-in-page.component';
import { MaterialModule } from '../material.module';
import { HomeService } from './services/home/home.service';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { UploadImageDialogComponent } from './components/upload-image-dialog/upload-image-dialog.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { FeedComponent } from './components/feed/feed.component';
import { FeedTabComponent } from './components/feed-tab/feed-tab.component';
import { SpinnerService } from '../shared/services/spinner/spinner.service';
import { SearchComponent } from './components/search/search.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import {StepperComponent} from "../shared/components/stepper/stepper.component";
import {SharedModule} from "../shared/shared.module";
import { AddPostCaptionComponent } from './components/steps/add-post-caption/add-post-caption.component';
import { UploadPictureComponent } from './components/steps/upload-picture/upload-picture.component';
import {WebcamModule} from "ngx-webcam";
import { CropPictureComponent } from './components/steps/crop-picture/crop-picture.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMatSelectSearchModule,
    SharedModule,
    WebcamModule,
  ],
  declarations: [
    HomePageComponent,
    SignInPageComponent,
    UploadImageComponent,
    UploadImageDialogComponent,
    AccountDetailsComponent,
    FeedComponent,
    FeedTabComponent,
    SearchComponent,
    AddPostComponent,
    AddPostCaptionComponent,
    UploadPictureComponent,
    CropPictureComponent,
  ],
  entryComponents: [
    UploadImageDialogComponent,
  ],
  providers: [
    HomeService,
    SpinnerService,
  ]

})
export class HomeModule { }
