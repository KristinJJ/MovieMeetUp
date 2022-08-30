import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topNav',
  templateUrl: './topNav.component.html',
  styleUrls: ['./topNav.component.scss']
})
export class TopNavComponent implements OnInit {
  //loggedUser: boolean = false;
  logoutURL= environment.logoutURL;

  constructor(private authGuard: AuthGuard, private authService: AuthService, private ref: ChangeDetectorRef) { }

  /* checkLoggedInStatus(): boolean {
    if (sessionStorage.getItem("hostID") !== null) {
      this.loggedUser = this.authService.isLoggedIn;
      this.ref.detectChanges();
    }
    console.log('topnav checking: ' + this.loggedUser);
    this.ref.detectChanges();
    return this.loggedUser;
  } */

  ngOnInit(): void {
    //this.checkLoggedInStatus();
    /* this.loggedUser = this.authService.isLoggedIn;
    console.log("topNav OnInit: loggedUser=" + this.loggedUser);
    this.checkLoggedInStatus();
    console.log("topNav ngOnit: checkLoggedInStatus: "+ this.loggedUser);
    this.ref.detectChanges(); */
    window.onload = function() {
      /*let topnavs = document.querySelectorAll('.topnav-item');
      if (window.location.href.indexOf('/home') || window.location.href.indexOf('/event')) {
        topnavs.forEach(item => { 
          item.classList.remove('topnav-item');
        });
      } else {
        topnavs.forEach(item => { 
          item.classList.add('topnav-item');
        });
      };
        //for (let i = 0, len=items.length; i <len; i++) {
        //  items[i].classList.remove('topnav-item');   //.style.removeProperty("visibility");
        //}
           //.querySelectorAll('.topnav-item')[0].style.display = 'none';
      */
    };
  }
  

}
