import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { cookieSessionName } from '../../constants/key-names';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.cookieService.check(cookieSessionName) ? true : this.canNavigate(route);
  }

  private canNavigate(route: ActivatedRouteSnapshot): Observable<boolean> {
       return this.loginService.isAuth$
        .pipe(
          map(isAuth => {
            if (!isAuth) {
              this.router.navigate(['sign-in']);
            }
            return isAuth;
          })
        );
    }
}
