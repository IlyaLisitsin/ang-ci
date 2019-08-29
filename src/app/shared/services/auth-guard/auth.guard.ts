import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


import { AuthService } from '../auth/auth.service';
import {UserResponse} from '../../models/UserResponse';

@Injectable()
export class AuthGuard implements CanActivate {
  authorizedUser$: Observable<UserResponse>;

  constructor(
    loginService: AuthService,
    private router: Router,
  ) {
    this.authorizedUser$ = loginService.authorizedUser$;
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.canNavigate(route);
  }

  private canNavigate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authorizedUser$
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
