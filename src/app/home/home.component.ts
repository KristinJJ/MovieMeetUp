import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { HttpClient } from '@angular/common/http';
import { MovieEvent } from '../event/event.component';
import { RankingService } from '../ranking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  movieEvents: MovieEvent[] = [];
  demoID = "DEMO";
  constructor(public apicall: ApicallService, private rankingService: RankingService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.rankingService.loadMovieEventsByHostID(this.demoID);
    this.movieEvents = this.rankingService.getMovieEvents();
    // maybe take the assignment of the movieEvents out of ngOnInit, it is adding movies each time to the movieEvents variable
  }

}
