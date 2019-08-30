import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.canNavigate(route);
  }

  private canNavigate(route: ActivatedRouteSnapshot): Observable<boolean> {
       return this.loginService.authorizedUser$
        .pipe(
          map(isAuth => {
            if (!isAuth) {
              this.router.navigate(['sign-in']);
            }
            return !!isAuth;
          })
        );
    }
}
