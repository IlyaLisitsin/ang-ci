import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AUTH_APIS } from '../../constants/apis';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoginService {
  isAuthorized$: Observable<boolean>  = of(false);

  constructor(
    private http: HttpClient,
  ) { }

  private login(user) {
    this.http.post(AUTH_APIS.login, user).subscribe(el => console.log(34324, el));
  }

}
