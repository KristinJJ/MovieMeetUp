import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import jwtDecode, { JwtPayload }  from "jwt-decode";

export interface JwtPayloadCognito extends JwtPayload {
  preferred_username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Input() isLoggedIn = false;
  redirectURL: string | null = null;
  idToken = '';
  accessToken = '';

 /*  ngOnInit() {

  } */
  login(): Observable<boolean>{
    // for page refresh when logged in - AuthService wants to reset variables on a page refresh
    if (sessionStorage.getItem("hostID") !== null) {
      this.isLoggedIn = true;
    }

    if (sessionStorage.getItem("hostID") === null) {
      var url = new URL(window.location.href.replace('#', '?'));
      console.log("URL: " + url);
      console.log("href: "+ window.location.href);

      const urlSearchParams = url.searchParams;
      console.log("urlSP: "+ urlSearchParams);
      this.idToken = String(url.searchParams.get("id_token"));
      this.accessToken = String(url.searchParams.get("access_token"));
      
      console.log("idToken: " + this.idToken);
      console.log("accessToken: " + this.accessToken);

      const decoded = jwtDecode<JwtPayloadCognito>(this.idToken);
      // do we need to decode the accessToken, as well?  Not sure when that will be needed, possibly for Creating Events
      console.log(decoded);

      sessionStorage.setItem('hostID', decoded.preferred_username);
      sessionStorage.setItem('id_token', this.idToken);
      sessionStorage.setItem('access_token', this.accessToken);

      //this.isLoggedIn = true;

      console.log("session storage-host: "+ sessionStorage.getItem('hostID'));
      console.log("session storage-idToken: " + sessionStorage.getItem('id_token')); 
      console.log("session storage-accessToken: " + sessionStorage.getItem('access_token'));

      
    } 
    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
