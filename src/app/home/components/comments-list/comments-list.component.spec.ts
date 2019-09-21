import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListComponent } from './comments-list.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { MaterialModule } from '../../../material.module';
import { FeedComponent } from '../feed/feed.component';
import { LikesListComponent } from '../likes-list/likes-list.component';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [
        CommentsListComponent,
        AccountDetailsComponent,
        FeedComponent,
        LikesListComponent,
        TimeAgoPipe,
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
