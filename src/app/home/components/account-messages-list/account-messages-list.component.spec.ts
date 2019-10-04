import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';


import { AccountMessagesListComponent } from './account-messages-list.component';
import { HomeService } from '../../services/home/home.service';
import { MessagesComponent } from '../messages/messages.component';
import { MaterialModule } from '../../../material.module';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { FeedComponent } from '../feed/feed.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { LikesListComponent } from '../likes-list/likes-list.component';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';

describe('AccountMessagesListComponent', () => {
  let component: AccountMessagesListComponent;
  let fixture: ComponentFixture<AccountMessagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
      ],
      declarations: [
        AccountMessagesListComponent,
        MessagesComponent,
        TimeAgoPipe,
        AccountDetailsComponent,
        FeedComponent,
        CommentsListComponent,
        LikesListComponent,
      ],
      providers: [
        CookieService,
        HomeService,
        SpinnerService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
