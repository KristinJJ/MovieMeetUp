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
  confmsg = '';
  public confirmed = false;
  eventIDFromRoute = '';
  highestRank = 'no highest rank';
  movieEvent: MovieEvent | undefined;
  url = 'https://www.moviemeetup.com/ranking/';
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
    this.movieEvent = this.route.snapshot.data.movieEvent;
    console.log("movieEvent", this.movieEvent);
    //this.findMovieEventByEventID();
    
    this.loadMoviesFromEvent();
  }

  findMovieEventByEventID() {
    //console.log(this.movieEvents);
    for (let index in this.movieEvents) {
      // make sure the hostID and eventIDs match
      if ((this.movieEvents[index].hostID == this.hostID && this.movieEvents[index].id == this.eventIDFromRoute )) {
        this.movieEvent = this.movieEvents[index];
        console.log("adding movieEvent: ", this.movieEvent);
        const testdate = new Date( Date.parse(this.movieEvent.eventDate) )
        const today = new Date();
        console.log("TESTDATE?: " + testdate);
        if (this.getDifferenceInDays(today,testdate) < 1) {
          this.router.navigateByUrl(`finalranking/${this.eventIDFromRoute}`);
        }
        console.log("today get time: " + today.getTime());
        console.log("testdate get time: " + testdate.getTime());
        console.log("getDifferenceInDays: " + this.getDifferenceInDays(today, testdate));
      }
    }
  }

  
    
    
      //this.eventDate.getDate() + 1)
      //console.log(JSON.parse(this.eventDate));
      
  

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

  getDifferenceInDays(date1: Date, date2: Date) {
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());
    return diffInMs / (1000 * 60 * 60 * 24);
  }


  drop(event: CdkDragDrop<{ title: string, image: string }[]>) {
    if (this.movieItemArray) {
    moveItemInArray(this.movieItemArray, event.previousIndex, event.currentIndex);
    }
  }

  submitUserID() {
    this.userID = this.value;
    console.log("User ID: " + this.userID);
  }

  confmessage(): void {
    this.confirmed = true;
    console.log("confirmed: " + this.confirmed);
    setTimeout(() => {
      this.confirmed = false;
      console.log("confirmed: " + this.confirmed);
    }, 4000);
  }

  submitRanking() {
    if (this.userID == "") {
      this.errorMsg = 'You must enter a User ID.';
      return;
    } else {
      this.errorMsg = '';
    }
    console.log("User ID: " + this.userID);
    console.log("Highest rank: " + this.highestRank);

    for (let entry of this.movieRankings.entries()) {
      console.log('movie title: ' + entry[0])
      //console.log('points: ' + entry[1]);
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
    this.userID = "";

    this.confmsg = `Your movie ranking has been submitted!`;
    this.confmessage();
  }

}
