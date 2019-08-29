import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth/auth.service';
import { catchError } from 'rxjs/operators';
import { resetUserErrorMessages } from '../constants/apis';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {}

  private onResponseError(errorResponse: HttpErrorResponse) {
    // if (error.status === this.authFailStatusCode) {
      // this.store.dispatch(new AuthActions.RefreshAuthTokens());
    // }

    if (resetUserErrorMessages.includes(errorResponse.error.errorMessage)) {
      this.authService.resetUser();
    }
    return Observable.throw(errorResponse);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeaders = {
      ...(this.authService.authorizedUser ? { Authorization: `Token ${this.authService.authorizedUser['token']}` } : null)
    };

    const authRequest = request.clone({
      setHeaders: { ...authHeaders },
    });

    return next
      .handle(authRequest).pipe(
        catchError(error => this.onResponseError(error))
      );
  }

}
