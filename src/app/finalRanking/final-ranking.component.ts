/* import { Component, OnInit } from '@angular/core';
import { MovieEvent } from '../event/event.component';
import { PopMovieItem } from '../movies';
import { ActivatedRoute } from '@angular/router';
import { RankingService } from '../ranking.service';
import { Router } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { HttpClient } from '@angular/common/http'; */
import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApicallService } from '../apicall.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieItem, movielist, popMovieSamples, PopMovieItem } from '../movies';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieEvent } from '../event/event.component';
import { ActivatedRoute } from '@angular/router';
import { RankingService } from '../ranking.service';
import { RankUpdate } from '../ranking/ranking.component';

@Component({
  selector: 'app-final-ranking',
  templateUrl: './final-ranking.component.html',
  styleUrls: ['./final-ranking.component.scss']
})
export class FinalRankingComponent implements OnInit {
  id = '';
  eventTitle = '';
  eventDate = '';
  movieItemArray: (PopMovieItem)[] | undefined;
  movieEvent: MovieEvent | undefined;
  url = 'http://localhost:4200/finalranking/';
  rankings: (RankUpdate)[] | undefined;

  // TEMP VARIABLES - until ranking service but is fixed
  demoID = "DEMO";
  movieEvents: MovieEvent[] = [];

  constructor(public apicall: ApicallService, private rankingService: RankingService, private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    // TEMP rankingService call to make the 'getMovieEventByEventID' have an array to pull from for now
    //this.rankingService.loadMovieEventsByHostID(this.demoID);
    //this.movieEvents = this.rankingService.getMovieEvents();

    // First get the event id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const eventIDFromRoute = String(routeParams.get('eventID'));
    console.log("eventIDFromRoute: " + eventIDFromRoute);

    // Find the event that correspond with the id provided in route.
  this.movieEvent = JSON.parse(JSON.stringify(this.rankingService.getMovieEventByEventID(eventIDFromRoute)));
  // this.movieEvent = this.rankingService.getMovieEventByEventID(eventIDFromRoute);
  console.log("movieEvent: " + JSON.stringify(this.movieEvent));
   this.loadMoviesFromEvent();
  }
  

  loadMoviesFromEvent() {
    // if movieEvent is not undefined or null, assign movies to movieItemArray
    if (this.movieEvent != undefined) {
      this.eventTitle = this.movieEvent.eventTitle;
      this.eventDate = this.movieEvent.eventDate;
      this.movieItemArray = this.movieEvent.eventMovies;
      this.rankings = this.movieEvent.eventRankings;

      if (this.rankings != undefined) {
        const specRank = this.rankings[3];
        console.log("specRank: " + JSON.stringify(specRank));
        // console.log("target: " + JSON.stringify(this.movieEvent.eventRankings[3]));
        console.log("target userID: " + specRank.userID);
        
        console.log("target rankings: " + specRank.UserRankings);
        // cant seem to drill into the RankUpdate "rankings" attribute in any way--it's a PopMovieItem[], but I can't target just the first item, for example --> 'specRank.rankings[1]' doesn't work
        // JSON.stringify(specRank.rankings) doesnt change anything.
        
      }
      if (this.movieEvent.id) {
        this.id = this.movieEvent.id;
        this.url = this.url + this.id;
      }
    }
  }

}
