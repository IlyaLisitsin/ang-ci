import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AUTH_APIS } from '../../constants/apis';

interface UserSignInFields {
  email: string;
  password: string;
}

interface UserResponse {
  user: {
    _id: string;
    email: string;
    token: string;
  };
}

interface UserSignUpFields {
  login: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  authorizedUser$: Observable<null | UserResponse> = of(null);
  authorizedUser: UserResponse | null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public login(userSignInFields: UserSignInFields): Observable<UserResponse | HttpResponse<UserResponse>> {
    const body = { user: userSignInFields };
    return this.http.post(AUTH_APIS.login, body)
      .pipe(
        map((response: HttpResponse<UserResponse>) => this.authMapper(response)),
        catchError(() => this.authCatcher()),
      );
  }

  public register(userSignUpFields: UserSignUpFields) {
    const body = { user: userSignUpFields };
    return this.http.post(AUTH_APIS.register, body)
      .pipe(
        map((response: HttpResponse<UserResponse>) => this.authMapper(response)),
        catchError(() => this.authCatcher()),
      );
  }

  private authMapper(response: HttpResponse<UserResponse>): HttpResponse<UserResponse> {
    if (response && response['user']) {
      this.authorizedUser$ = of(response['user']);
      this.authorizedUser = response['user'];
    }
    this.router.navigate(['']);
    return response;
  }

  public resetUser() {
    this.authorizedUser$ = of(null);
    this.authorizedUser = null;
    this.router.navigate(['sign-in']);
  }

  private authCatcher() {
    this.authorizedUser$ = of(null);
    return this.authorizedUser$;
  }
}
