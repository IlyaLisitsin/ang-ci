import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LikesListComponent } from './likes-list.component';
import { MaterialModule } from '../../../material.module';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { FeedComponent } from '../feed/feed.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { MessagesComponent } from '../messages/messages.component';
import { AccountMessagesListComponent } from '../account-messages-list/account-messages-list.component';

describe('LikesListComponent', () => {
  let component: LikesListComponent;
  let fixture: ComponentFixture<LikesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
      ],
      declarations: [
        LikesListComponent,
        AccountDetailsComponent,
        FeedComponent,
        CommentsListComponent,
        TimeAgoPipe,
        MessagesComponent,
        AccountMessagesListComponent,
      ],
      providers: [
        HomeService,
        SpinnerService,
        WebsocketService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
