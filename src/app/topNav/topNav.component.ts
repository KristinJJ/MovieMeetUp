import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topNav',
  templateUrl: './topNav.component.html',
  styleUrls: ['./topNav.component.css']
})
export class TopNavComponent implements OnInit {
  public loggedUser = false;

  constructor(private authGuard: AuthGuard, private authService: AuthService) { }
  checkLoggedInStatus(): boolean {
    if (sessionStorage.getItem("hostID") !== null) {
      this.loggedUser = true;
    }
    console.log('topnav check: ' + this.loggedUser);
    return this.loggedUser;
  }

  ngOnInit(): void {
    this.checkLoggedInStatus();
  }
  

}
