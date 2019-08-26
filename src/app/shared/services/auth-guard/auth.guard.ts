import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuthorized$: Observable<boolean>;

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.canNavigate(route);
  }

  private canNavigate(route: ActivatedRouteSnapshot) {
    console.log('ROUTE', route)
    return true;
  }
}
