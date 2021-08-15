import { Component } from '@angular/core';
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
  rankDetails: (PopMovieItem) [] | undefined;
  highestRank: PopMovieItem | undefined;
  movieEvents: MovieEvent[] = [];
  eventIDFromRoute = '';
  // TEMP VARIABLES - until ranking service bug is fixed?
  //demoID = "DEMO";
  hostID = environment.demoUserID;
  //movieEvents: MovieEvent[] = [];
  
  constructor(public apicall: ApicallService, private rankingService: RankingService, private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.movieEvents = this.route.snapshot.data.movieEvents;
     // First get the event id from the current route.
     const routeParams = this.route.snapshot.paramMap;
     this.eventIDFromRoute = String(routeParams.get('eventID'));
     console.log("eventIDFromRoute: " + this.eventIDFromRoute);
     
  
     // Find the event that corresponds with the id provided in route
    this.movieEvents = this.route.snapshot.data.movieEvent;
    console.log("movieEvents?", this.movieEvents);
    this.findMovieEventByEventID();

    this.loadMoviesFromEvent();
     
      
    
 /*      this.movieEvents = this.rankingService.getMovieEvents();
      this.movieEvent = JSON.parse(JSON.stringify(this.rankingService.findMovieEventByEventID(environment.demoUserID, this.eventIDFromRoute)))
     
  // this.movieEvent = this.rankingService.getMovieEventByEventID(eventIDFromRoute);
  console.log("movieEvent: " + JSON.stringify(this.movieEvent));

    this.loadMoviesFromEvent(); */

   
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
  

  loadMoviesFromEvent() {
    // if movieEvent is not undefined or null, assign movies to movieItemArray
    if (this.movieEvent != undefined) {
      this.eventTitle = this.movieEvent.eventTitle;
      this.eventDate = this.movieEvent.eventDate;
      this.movieItemArray = this.movieEvent.eventMovies;

      // currently, I'm just referencing eventRankings[1].UserRankings, but I believe all that would need to change would be the various calls to that particular array.
      this.rankings = this.movieEvent.eventRankings;


/*       if (this.rankings != undefined) {
        const specRank = this.rankings[1];
        console.log("specRank: " + JSON.stringify(specRank));

        console.log("target userID: " + specRank.userID);
        
        console.log("target rankings: " + JSON.stringify(specRank.UserRankings));
        if (specRank.UserRankings) {        
          console.log("target first movie in UserRankings: " + JSON.stringify(specRank.UserRankings[3]));
          console.log("UserRankings length: " + specRank.UserRankings.length);
        }
        console.log("target points: " + specRank.UserRankings![1].points);
        
      } */
      if (this.movieEvent.id) {
        this.id = this.movieEvent.id;
        this.url = this.url + this.id;
      }
    }
    this.findTopMovie();
  }

  // currently, I'm just referencing eventRankings[1].UserRankings, but I believe all that would need to change would be the various calls to that particular array.
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
