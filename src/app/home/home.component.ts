import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { HttpClient } from '@angular/common/http';
import { MovieEvent } from '../event/event.component';
import { RankingService } from '../ranking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  movieEvents: MovieEvent[] = [];
  constructor(public apicall: ApicallService, private rankingService: RankingService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.rankingService.loadMovieEventsByHostID(environment.demoUserID);
    this.movieEvents = this.rankingService.getMovieEvents();
  }

}
