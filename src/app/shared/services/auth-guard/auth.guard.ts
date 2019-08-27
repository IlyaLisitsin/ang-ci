import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';


import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuthorized$: Observable<boolean> = of(false);

  constructor(
    loginService: LoginService,
    private router: Router,
  ) {
    this.isAuthorized$ = loginService.isAuthorized$
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.canNavigate(route);
  }

  private canNavigate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isAuthorized$
      .pipe(
        map(isAuth => {
          if (!isAuth) {
            this.router.navigate(['sign-in'])
          }
          return isAuth;
        })
      )
  }
}
