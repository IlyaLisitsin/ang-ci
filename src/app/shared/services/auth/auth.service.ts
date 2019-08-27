import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AUTH_APIS } from '../../constants/apis';

interface UserFileds {
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

@Injectable()
export class AuthService {
  isAuthorized$: Observable<boolean> = of(false);
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public login(userFields: UserFileds) {
    const body = { user: userFields };
    return this.http.post(AUTH_APIS.login, body)
    // return this.http.post('http://localhost:5000/api/users/login', body)
      .pipe(
        map((response: HttpResponse<UserResponse>) => {
          if (response && response['user']) {
            this.isAuthorized$ = of(true);
          }
          this.router.navigate(['']);

          return response;
        }),
        catchError(() => {
          this.isAuthorized$ = of(false);
          return this.isAuthorized$;
        }),
      );
  }

  public getToken() { return this.token; }

}
