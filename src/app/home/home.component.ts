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
  logoutURL= environment.logoutURL;

  constructor(public apicall: ApicallService, private router: Router, private rankingService: RankingService, private httpClient: HttpClient, private route: ActivatedRoute) {
    };

    

  ngOnInit(): void {

    console.log("session storage-host: "+ sessionStorage.getItem('hostID'));
    this.rankingService.loadMovieEventsByHostID(String(sessionStorage.getItem('hostID')));
    this.movieEvents = this.rankingService.getMovieEvents();
  
    
  }

}
