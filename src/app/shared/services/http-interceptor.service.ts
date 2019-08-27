import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {}

  private onResponseError(error: HttpErrorResponse) {
    // if (error.status === this.authFailStatusCode) {
      // this.store.dispatch(new AuthActions.RefreshAuthTokens());
    // }

    return Observable.throw(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authHeaders = {
      authorization: `Token ${this.authService.getToken()}`
    };

    const authRequest = request.clone(
    //   {
    //   setHeaders: { ...authHeaders },
    // }
    );

    return next
      .handle(authRequest);
      // .catch(error => this.onResponseError(error));
  }

}
