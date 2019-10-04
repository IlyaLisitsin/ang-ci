import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommentsListComponent } from './comments-list.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { MaterialModule } from '../../../material.module';
import { FeedComponent } from '../feed/feed.component';
import { LikesListComponent } from '../likes-list/likes-list.component';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { MessagesComponent } from '../messages/messages.component';
import { AccountMessagesListComponent } from '../account-messages-list/account-messages-list.component';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
      ],
      declarations: [
        CommentsListComponent,
        AccountDetailsComponent,
        FeedComponent,
        LikesListComponent,
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
    fixture = TestBed.createComponent(CommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
