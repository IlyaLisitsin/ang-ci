import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

import { MessagesComponent } from './messages.component';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { MaterialModule } from '../../../material.module';
import { FeedComponent } from '../feed/feed.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { LikesListComponent } from '../likes-list/likes-list.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
      ],
      declarations: [
        MessagesComponent,
        AccountDetailsComponent,
        FeedComponent,
        CommentsListComponent,
        LikesListComponent,
        TimeAgoPipe,
      ],
      providers: [
        HomeService,
        SpinnerService,
        WebsocketService,
        CookieService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
