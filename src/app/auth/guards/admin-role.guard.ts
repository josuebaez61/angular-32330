import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService, private readonly router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionService.user$
      .pipe(
        map((user) => {
          if (!user) {
            this.router.navigate(['auth', 'login'])
          }
          if (user?.role !== 'admin') {
            return false;
          }
          return true;
        })
      );
  }

}
