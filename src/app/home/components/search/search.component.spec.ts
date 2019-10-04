import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { SearchComponent } from './search.component';
import { MaterialModule } from '../../../material.module';
import { HomeService } from '../../services/home/home.service';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { FeedComponent } from '../feed/feed.component';
import { LikesListComponent } from '../likes-list/likes-list.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { MessagesComponent } from '../messages/messages.component';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { AccountMessagesListComponent } from '../account-messages-list/account-messages-list.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        HttpClientTestingModule,
      ],
      declarations: [
        SearchComponent,
        AccountDetailsComponent,
        FeedComponent,
        LikesListComponent,
        CommentsListComponent,
        TimeAgoPipe,
        MessagesComponent,
        AccountMessagesListComponent,
      ],
      providers: [
        HomeService,
        WebsocketService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
