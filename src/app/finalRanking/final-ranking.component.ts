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
  rankings: RankUpdate[] = [];
  finalRankings: MovieEvent[] = [];
  rankDetails: (PopMovieItem) [] | undefined;
  // TEMP VARIABLES - until ranking service but is fixed
  demoID = "DEMO";
  movieEvents: MovieEvent[] = [];
  highestRank: PopMovieItem | undefined;
  eventIDFromRoute = "";
  hostID = environment.demoUserID;
  finalRanking = new Map();
  userRankings: RankUpdate[] = [];

  constructor(
    public apicall: ApicallService, 
    private rankingService: RankingService, 
    private router: Router, 
    private httpClient: HttpClient, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // temporary until real API call with ranked choice voting
    //this.movieEvents = this.route.snapshot.data.movieEvents;

    // First get the event id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.eventIDFromRoute = String(routeParams.get('eventID'));
    //console.log("eventIDFromRoute: " + this.eventIDFromRoute);
    
    this.movieEvent = this.route.snapshot.data.finalRanking;
    console.log("this.movieEvent", this.movieEvent);
    //this.loadMovieEvent();

    // Find the event that corresponds with the id provided in route
    //this.movieEvents = this.route.snapshot.data.movieEvent;
    //console.log("movieEvents?", this.movieEvents);
    //this.findMovieEventByEventID();

    this.calcFinalRanking();
    
    this.loadMoviesFromEvent();
  }

  loadMovieEvent() {
    return this.apicall.getFinalRankings(this.eventIDFromRoute).subscribe((data) => {
      this.movieEvent = data;
      console.log("movieEvent from Lambda: ", data);
    })
  }

  findMovieEventByEventID() {
    //console.log(this.movieEvents);
    for (let index in this.movieEvents) {
      // make sure the hostID and eventIDs match
     if ((this.movieEvents[index].hostID == this.hostID && this.movieEvents[index].id == this.eventIDFromRoute )) {
        this.movieEvent = this.movieEvents[index];
        console.log("adding movieEvent: ", this.movieEvent);
      }
    }
  }

  calcFinalRanking() {
    console.log(this.movieEvent);
    console.log(this.movieEvent?.eventRankings);
    if (this.movieEvent?.eventRankings == undefined) {
      console.log("no one has ranked the movies yet");
    } else {
      for (let userRanking in this.movieEvent?.eventRankings) {
        console.log("userRanking: ", userRanking);
        //this.userRankings.push(userRanking);
        //for (let movieRanking in userRanking.) {
          //this.finalRanking.set();
        //}
      }
    }
  }

  loadMoviesFromEvent() {
    // if movieEvent is not undefined or null, assign movies to movieItemArray
    if (this.movieEvent != undefined) {
      this.eventTitle = this.movieEvent.eventTitle;
      this.eventDate = this.movieEvent.eventDate;
      this.movieItemArray = this.movieEvent.eventMovies;
      if (this.movieEvent.eventRankings != undefined) {
        this.rankings = this.movieEvent.eventRankings;
      }
      


      if (this.rankings != undefined) {
        // this.rankDetails =;
        const specRank = this.rankings[1];
        //console.log("specRank: " + JSON.stringify(specRank));
        // console.log("target: " + JSON.stringify(this.movieEvent.eventRankings[3]));
        console.log("target userID: " + specRank.userID);
        
        // console.log("target rankings: " + JSON.stringify(specRank.UserRankings));
        if (specRank.UserRankings) {        
          //console.log("target first movie in UserRankings: " + JSON.stringify(specRank.UserRankings[3]));
          console.log("UserRankings length: " + specRank.UserRankings.length);
          //let urank = JSON.parse(JSON.stringify(specRank.UserRankings[3]));
          //console.log("test: " + urank);

          //let urankings = specRank.UserRankings.join();
          //console.log("urankings(JPJS): " + JSON.parse(JSON.stringify(urankings)));
          //console.log("urankings lgth: " + urankings.length);
        }
        console.log("target points: " + specRank.UserRankings![1].points);
        
      }
      if (this.movieEvent.id) {
        this.id = this.movieEvent.id;
        this.url = this.url + this.id;
      }
    }
    this.findTopMovie();
  }

  findTopMovie() {
    let topMovie;
    let maxValue = 0;
    if (this.rankings != undefined) { 
    let specRank = this.rankings[1]
    for (let i=0; i< specRank!.UserRankings!.length; i++) {
      let newValue = this.rankings![1].UserRankings![i].points;
      if (newValue != undefined && newValue > maxValue) {
        maxValue = newValue;
        topMovie = this.rankings![1].UserRankings![i];
      }
    }
  }
    this.highestRank = topMovie;
  }

}
