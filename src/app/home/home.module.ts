import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { WebcamModule } from 'ngx-webcam';

import { HomePageComponent } from './page/home-page/home-page.component';
import { SignInPageComponent } from './page/sign-in-page/sign-in-page.component';
import { MaterialModule } from '../material.module';
import { HomeService } from './services/home/home.service';
import { UploadImageDialogComponent } from './components/upload-image-dialog/upload-image-dialog.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { FeedComponent } from './components/feed/feed.component';
import { FeedTabComponent } from './components/feed-tab/feed-tab.component';
import { SpinnerService } from '../shared/services/spinner/spinner.service';
import { SearchComponent } from './components/search/search.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { SharedModule } from '../shared/shared.module';
import { AddPostCaptionComponent } from './components/steps/add-post-caption/add-post-caption.component';
import { UploadPictureComponent } from './components/steps/upload-picture/upload-picture.component';
import { CropPictureComponent } from './components/steps/crop-picture/crop-picture.component';
import { LikesListComponent } from './components/likes-list/likes-list.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AccountMessagesListComponent } from './components/account-messages-list/account-messages-list.component';


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
    UploadImageDialogComponent,
    AccountDetailsComponent,
    FeedComponent,
    FeedTabComponent,
    SearchComponent,
    AddPostComponent,
    AddPostCaptionComponent,
    UploadPictureComponent,
    CropPictureComponent,
    LikesListComponent,
    CommentsListComponent,
    MessagesComponent,
    AccountMessagesListComponent,
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
