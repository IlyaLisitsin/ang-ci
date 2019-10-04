import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { WebcamModule } from 'ngx-webcam';

import { HomePageComponent } from './home-page.component';
import { HomeService } from '../../services/home/home.service';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FeedTabComponent } from '../../components/feed-tab/feed-tab.component';
import { AccountDetailsComponent } from '../../components/account-details/account-details.component';
import { FeedComponent } from '../../components/feed/feed.component';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { SearchComponent } from '../../components/search/search.component';
import { AddPostComponent } from '../../components/add-post/add-post.component';
import { SharedModule } from '../../../shared/shared.module';
import { AddPostCaptionComponent } from '../../components/steps/add-post-caption/add-post-caption.component';
import { UploadPictureComponent } from '../../components/steps/upload-picture/upload-picture.component';
import { CropPictureComponent } from '../../components/steps/crop-picture/crop-picture.component';
import { LikesListComponent } from '../../components/likes-list/likes-list.component';
import { CommentsListComponent } from '../../components/comments-list/comments-list.component';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { MessagesComponent } from '../../components/messages/messages.component';
import { AccountMessagesListComponent } from '../../components/account-messages-list/account-messages-list.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        SharedModule,
        WebcamModule,
      ],
      declarations: [
        HomePageComponent,
        FeedTabComponent,
        AccountDetailsComponent,
        FeedComponent,
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
      providers: [
        HomeService,
        AuthService,
        CookieService,
        SpinnerService,
        WebsocketService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
