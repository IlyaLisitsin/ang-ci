import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { HttpInterceptorService } from './http-interceptor.service';
import { WebsocketService } from './ws/websocket.service';
import { SpinnerService } from './spinner/spinner.service';


describe('HttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        HttpInterceptorService,
        CookieService,
        AuthService,
        WebsocketService,
        SpinnerService,
      ]
    });
  });

  it('should be created', inject([HttpInterceptorService], (service: HttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
