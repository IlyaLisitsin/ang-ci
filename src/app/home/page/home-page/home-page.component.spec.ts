import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { HomePageComponent } from './home-page.component';
import { HomeService } from '../../services/home/home.service';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UploadImageComponent } from '../../components/upload-image/upload-image.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        HomePageComponent,
        UploadImageComponent,
      ],
      providers: [
        HomeService,
        AuthService,
        CookieService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
