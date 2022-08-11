import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private ua: UserAuthService, private router: Router) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const signInAccess = ["/report", "/profilepage"],
    notSignedInAccess = ["/login", "/register", "/forgetpassword"]
    const user = this.ua.currUser.getValue()
    return (signInAccess.includes(state.url) && user !== null) ||
      notSignedInAccess.includes(state.url) && user === null ? true :
      this.router.parseUrl("")
  }
  
}
