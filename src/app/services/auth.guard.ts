import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
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
    const user = localStorage.getItem("jwt")
    return (signInAccess.includes(`/${route.url[0]}`) && user !== null) ||
      (notSignedInAccess.includes(`/${route.url[0]}`) && user === null) ? true :
      this.router.parseUrl("")
    
  }
  
}
