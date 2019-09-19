import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth/auth.service';

import { resetUserErrorMessages } from '../constants/apis';
import { cookieSessionName } from '../constants/key-names';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  private onResponseError(errorResponse: HttpErrorResponse) {
    // if (error.status === this.authFailStatusCode) {
      // this.store.dispatch(new AuthActions.RefreshAuthTokens());
    // }

    if (resetUserErrorMessages.includes(errorResponse.error.errorMessage)) {
      this.authService.resetUser();
      return;
    }
    return Observable.throw(errorResponse);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeaders = {
      ...(this.cookieService.check(cookieSessionName) ? { Authorization: `Token ${this.cookieService.get(cookieSessionName)}` } : null)
    };

    const authRequest = request.clone({
      setHeaders: { ...authHeaders },
    });

    return next
      .handle(authRequest).pipe(
        tap(event => {
          if (
            event instanceof HttpResponse
            && !event.url.includes('unlogedUserId')
            && !event.url.includes('search')
            && !event.url.includes('follow')
            && !event.url.includes('unfollow')
            && !event.url.includes('like-post')
            && !event.url.includes('unlike-post')
          ) {
            this.cookieService.set(cookieSessionName, event.body.token);
          }
        }),
        catchError(error => this.onResponseError(error))
      );
  }

}
