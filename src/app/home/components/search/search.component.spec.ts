import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { SearchComponent } from './search.component';
import { MaterialModule } from '../../../material.module';
import { HomeService } from '../../services/home/home.service';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { FeedComponent } from '../feed/feed.component';

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
        UploadImageComponent,
        FeedComponent,
      ],
      providers: [
        HomeService,
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
