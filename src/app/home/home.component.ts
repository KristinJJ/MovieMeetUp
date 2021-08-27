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
    var url = new URL(window.location.href.replace('#id_token', '?id_token'));
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

    
    
    
    this.rankingService.loadMovieEventsByHostID(decoded.preferred_username);
    this.movieEvents = this.rankingService.getMovieEvents();
  }

}
