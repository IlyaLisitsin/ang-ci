import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { cookieSessionName } from '../../constants/key-names';
import { UserResponse } from '../../models/UserResponse';
import { AUTH_APIS } from '../../constants/apis';

interface UserSignInFields {
  email: string;
  password: string;
}

interface UserSignUpFields {
  login: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  isAuth$: Observable<boolean> = of(false);
  isAuth: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  public login(userSignInFields: UserSignInFields): Observable<boolean> {
    const body = { user: userSignInFields };
    return this.http.post(AUTH_APIS.login, body)
      .pipe(
        map((response: UserResponse) => this.authMapper(response)),
        catchError(() => this.authCatcher()),
      );
  }

  public register(userSignUpFields: UserSignUpFields): Observable<boolean> {
    const body = { user: userSignUpFields };
    return this.http.post(AUTH_APIS.register, body)
      .pipe(
        map((response: UserResponse) => this.authMapper(response)),
        catchError(() => this.authCatcher()),
      );
  }

  private authMapper(response: UserResponse): boolean {
    this.isAuth$ = of(true);
    this.isAuth = true;
    this.cookieService.set(cookieSessionName, response.token);
    this.router.navigate(['']);
    return true;
  }

  public resetUser() {
    this.isAuth$ = of(false);
    this.isAuth = false;
    this.cookieService.delete(cookieSessionName);
    this.router.navigate(['sign-in']);
  }

  private authCatcher() {
    this.isAuth$ = of(false);
    this.cookieService.delete(cookieSessionName);
    return this.isAuth$;
  }
}
