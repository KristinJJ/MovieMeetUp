import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    // capture url
    state: RouterStateSnapshot): true|UrlTree {
      const url: string = state.url;
      console.log('state url: ' + url);
      console.log('AuthGuard#canActivate called');
      // if url has hosted UI login info, then run AuthService login function
      if (url.includes('id_token')) {
        this.authService.login();
        return this.checkLogin(url);
      }
      return this.checkLogin(url);   
  }

  checkLogin(url: string): true|UrlTree {
    // for page refresh when logged in - AuthService wants to reset variables on a page refresh
    if (sessionStorage.getItem("hostID") !== null) {
      this.authService.isLoggedIn = true;
    }
    console.log('checkLogin: isLoggedin=' + this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.authService.redirectURL = url;
    return this.router.parseUrl('/intro');
  }
  
}
