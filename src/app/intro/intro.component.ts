import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  loginURL = https://moviemeetup.com/home
  //loginURL= environment.loginURL;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    sessionStorage.clear();

    // somehow, going to /intro is already setting authService.isLoggedIn to false, and I'm not sure how.
    //this.authService.logout();
  }

}
