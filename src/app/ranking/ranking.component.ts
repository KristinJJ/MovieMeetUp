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


export interface RankUp {
  searchType: string;
  expression: string;
  Items?: (RankUpdate)[] | null;
  errorMessage: string;
}
export interface RankUpdate {
  eventID: string;
  userID: string;
  UserRankings: (PopMovieItem)[] | undefined;
  points?: number;
}

/**
 * @title Drag&Drop custom preview
 */
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {
  id = '';
  eventTitle = '';
  eventDate = '';
  value = '';
  userID = '';
  hostID = environment.demoUserID;
  title = 'Movie ranking';
  movieItemArray: (PopMovieItem)[] | undefined;
  movieRankings = new Map();
  errorMsg = '';
  eventIDFromRoute = '';
  highestRank = 'no highest rank';
  movieEvent: MovieEvent | undefined;
  url = 'http://localhost:4200/ranking/';
  movieEvents: MovieEvent[] = [];

  constructor(
    public apicall: ApicallService, 
    private rankingService: RankingService, 
    private router: Router, 
    private httpClient: HttpClient, 
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // First get the event id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.eventIDFromRoute = String(routeParams.get('eventID'));
    //console.log("eventIDFromRoute: " + this.eventIDFromRoute);

    // Find the event that corresponds with the id provided in route
    this.movieEvents = this.route.snapshot.data.movieEvent;
    console.log("movieEvents?", this.movieEvents);
    this.findMovieEventByEventID();
    
    this.loadMoviesFromEvent();
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
      
      if (this.movieEvent.id) {
        this.id = this.movieEvent.id;
        this.url = this.url + this.id;
      }
    }
  }

  drop(event: CdkDragDrop<{ title: string, image: string }[]>) {
    if (this.movieItemArray) {
    moveItemInArray(this.movieItemArray, event.previousIndex, event.currentIndex);
    }
  }

  submitUserID() {
    if (this.value == '') {
      this.errorMsg = 'You must enter a User ID.';
      return;
    } else {
      this.userID = this.value;
      this.errorMsg = '';
    }
    console.log("User ID: " + this.userID);
  }

  rankMovies() {
if (this.movieItemArray) {
    let points = this.movieItemArray.length
    for (let i = 0; i < this.movieItemArray.length; i++) {
      if (this.movieRankings.has(this.movieItemArray[i].title)) {
        let newRanking = points + this.movieRankings.get(this.movieItemArray[i].title)
        this.movieRankings.set(this.movieItemArray[i].title, newRanking);
        points--;
      } else {
        this.movieRankings.set(this.movieItemArray[i].title, points);

        // Adds points attribute with the value determined to the movie in movieItemArray
        this.movieItemArray[i].points = points;
        points--;
      }
      }
    }
    this.findTopMovie();
  }

  findTopMovie() {
    let topMovie = '';
    let maxValue = 0;
    for (let key of this.movieRankings.keys()) {
      let newValue = this.movieRankings.get(key);
      if (newValue > maxValue) {
        maxValue = newValue;
        topMovie = key;
      }
    }
    this.highestRank = topMovie;
  }

  submitRanking() {
    if (this.userID == '' || this.userID == 'No User ID Entered') {
      this.errorMsg = 'You must enter a User ID.';
      return;
    }
    this.rankMovies();
    console.log("Highest rank: " + this.highestRank);

    console.log("User ID: " + this.userID);
    for (let entry of this.movieRankings.entries()) {
      console.log('movie title: ' + entry[0])
      console.log('points: ' + entry[1]);
    }


    
    let rankingUpdate: RankUpdate = {
      eventID: this.id,
      userID: this.userID,
      UserRankings: this.movieItemArray
    }
    
    console.log('rankingUpdate: ' + JSON.stringify(rankingUpdate));
    console.log(typeof(rankingUpdate));
    console.log('rankings: ' + JSON.stringify(rankingUpdate.UserRankings));

    // THEN invoke apicall to put rankings into the DB.
    this.apicall.addUserRankings(rankingUpdate).subscribe(data => console.log(data));
  }

}
