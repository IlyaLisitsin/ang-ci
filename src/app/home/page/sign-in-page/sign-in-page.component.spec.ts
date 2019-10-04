import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { SignInPageComponent } from './sign-in-page.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MaterialModule } from '../../../material.module';
import { WebsocketService } from '../../../shared/services/ws/websocket.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';


describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
      ],
      providers: [
        AuthService,
        CookieService,
        WebsocketService,
        SpinnerService,
      ],
      declarations: [ SignInPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
