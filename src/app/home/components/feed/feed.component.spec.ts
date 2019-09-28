import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FeedComponent } from './feed.component';
import { MaterialModule } from '../../../material.module';
import { HomeService } from '../../services/home/home.service';
import { LikesListComponent } from '../likes-list/likes-list.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { MessagesComponent } from '../messages/messages.component';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
      ],
      declarations: [
        FeedComponent,
        LikesListComponent,
        AccountDetailsComponent,
        CommentsListComponent,
        TimeAgoPipe,
        MessagesComponent,
      ],
      providers: [
        HomeService,
        WebsocketService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
