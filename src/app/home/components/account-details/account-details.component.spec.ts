import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { AccountDetailsComponent } from './account-details.component';
import { MaterialModule } from '../../../material.module';
import { FeedComponent } from '../feed/feed.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { LikesListComponent } from '../likes-list/likes-list.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { MessagesComponent } from '../messages/messages.component';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        AccountDetailsComponent,
        CommentsListComponent,
        FeedComponent,
        LikesListComponent,
        TimeAgoPipe,
        MessagesComponent,
      ],
      providers: [
        AuthService,
        CookieService,
        HomeService,
        SpinnerService,
        WebsocketService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
