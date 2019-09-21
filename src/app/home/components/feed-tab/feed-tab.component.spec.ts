import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTabComponent } from './feed-tab.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { FeedComponent } from '../feed/feed.component';
import { MaterialModule } from '../../../material.module';
import { HomeService } from '../../services/home/home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { LikesListComponent } from '../likes-list/likes-list.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

describe('FeedTabComponent', () => {
  let component: FeedTabComponent;
  let fixture: ComponentFixture<FeedTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        FeedTabComponent,
        AccountDetailsComponent,
        FeedComponent,
        LikesListComponent,
        CommentsListComponent,
        TimeAgoPipe,
      ],
      providers: [
        AuthService,
        CookieService,
        HomeService,
        SpinnerService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
