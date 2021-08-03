import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApicallService } from '../apicall.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieItem, movielist, popMovieSamples, PopMovieItem } from '../movies';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieEvent } from '../event/event.component';

//userrankings object--like movieEvent object, with array of popmovies, plus a score attribute
export interface UserRank {
  searchType: string;
  expression: string;
  Items?: (UserRankings)[] | null;
  errorMessage: string;
}

export interface UserRankings {
    id: string;
    title: string;
    image: string;
    points?: number;
}

export interface RankUp {
  searchType: string;
  expression: string;
  Items?: (RankUpdate)[] | null;
  errorMessage: string;
}
export interface RankUpdate {
  eventID: string;
  userID: string;
  rankings: (UserRankings)[];
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
  title = 'Movie ranking';

  movieEvent: MovieEvent[] = []; // the event info the ranking is for
  movie: PopMovieItem[] = []; 
  id = 'testid';   // the movies to be ranked (from event) -- does this need to be separate?
  value = '';
  eventTitle = '';
  eventDate = '';
  userID = '';
  userRankings: UserRankings[] = [];
  movieRankings = new Map();  // 
  highestRank = 'no highest rank';

  constructor(public apicall: ApicallService, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.loadMovies(); 
    // do a similar "load event" like home.component? get an eventID, populate above attributes?
    //  FUTURE: eventID is in query string from the invite email?
  }

  navigate() {
    this.router.navigateByUrl('/events');
  }

  loadMovies() {
    if (environment.production === false) {
      this.movie = <PopMovieItem[]><unknown>popMovieSamples
      this.userRankings = <PopMovieItem[]><unknown>popMovieSamples;
      console.log("fake array: " + JSON.stringify(this.movie));
      return this.movie;
    } else {
    return this.apicall.getMovies("Star Wars").subscribe((data) => {
      //this.movie = data;
      console.log(data);
      console.log(this.movie[0]);
      })
    }
  }

  drop(event: CdkDragDrop<{ title: string, image: string }[]>) {
    moveItemInArray(this.movie, event.previousIndex, event.currentIndex);
  }

  submitUserID() {
    this.userID = this.value;
    console.log("User ID: " + this.userID);
  }

  rankMovies() {
    let points = this.movie.length
    for (let i = 0; i < this.movie.length; i++) {
      if (this.movieRankings.has(this.movie[i].title)) {
        let newRanking = points + this.movieRankings.get(this.movie[i].title)
        this.movieRankings.set(this.movie[i].title, newRanking);
        points--;
      } else {
        this.movieRankings.set(this.movie[i].title, points);

        // Adds points attribute with the value determined to the movie in userRankings array
        let movieIndex = this.userRankings.findIndex(x => x.title === this.movie[i].title);
        this.userRankings[movieIndex].points = points;
        points--;
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
    this.rankMovies(); 
    
    console.log("Highest rank: " + this.highestRank);

    console.log("User ID: " + this.userID);

    for (let entry of this.movieRankings.entries()) {
      console.log('movie title: ' + entry[0])
      console.log('points: ' + entry[1]);
      //find title in UserRankings array and update points?
      //this.userRankings.find(x => x.title === entry[0])
    }
    console.log(this.userRankings);

    // Still need to figure out how to target the movieEvent.id
    let rankingUpdate: RankUpdate = {
      eventID: this.id, //this.movieEvent[0].id,
      userID: this.userID,
      rankings: this.userRankings
    }
    console.log('rankingUpdate: ' + JSON.stringify(rankingUpdate));
    // THEN invoke apicall to put rankings into the DB.
    this.apicall.addUserRankings(rankingUpdate).subscribe();
  }

}
