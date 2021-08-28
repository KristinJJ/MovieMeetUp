import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { HttpClient } from '@angular/common/http';
import { MovieEvent } from '../event/event.component';
import { RankingService } from '../ranking.service';
import { environment } from 'src/environments/environment';
import jwtDecode, { JwtPayload }  from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


export interface JwtPayloadCognito extends JwtPayload {
  preferred_username: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  movieEvents: MovieEvent[] = [];
  idToken = '';
  accessToken = '';
  constructor(public apicall: ApicallService, private router: Router, private rankingService: RankingService, private httpClient: HttpClient, private route: ActivatedRoute) {
    };

    

  ngOnInit(): void {
    
    //if (sessionStorage.getItem("LoggedStatus") === null) {
      if (sessionStorage.getItem("hostID") === null) {
      var url = new URL(window.location.href.replace('#id_token', '?id_token'));
      console.log("URL: " + url);
      console.log("href: "+ window.location.href);
      
      // session storage value of loggedin t/f, if session storage has them logged in already, it skips the Params setup?

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
      sessionStorage.setItem('LoggedStatus', 'true');

      console.log("session storage-host: "+ sessionStorage.getItem('hostID'));
      console.log("session storage-idToken: " + sessionStorage.getItem('id_token')); 
      console.log("session storage-accessToken: " + sessionStorage.getItem('access_token'));
      
    }
    
    
    this.rankingService.loadMovieEventsByHostID(String(sessionStorage.getItem('hostID')));
    this.movieEvents = this.rankingService.getMovieEvents();
  }

}
