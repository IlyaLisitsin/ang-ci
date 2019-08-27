import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpInterceptorService } from './http-interceptor.service';


describe('HttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        HttpInterceptorService,
        AuthService,
      ]
    });
  });

  it('should be created', inject([HttpInterceptorService], (service: HttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
