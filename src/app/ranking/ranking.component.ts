import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApicallService } from '../apicall.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieItem, movielist } from '../movies';
import { environment } from 'src/environments/environment';
import { MovieEvent } from '../event/event.component';
import { ActivatedRoute } from '@angular/router';
import { RankingService } from '../ranking.service';

/**
 * @title Drag&Drop custom preview
 */
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {
  event: MovieEvent | undefined;
  title = 'Movie ranking';
  Movie: MovieItem[] = [];
  value = '';
  userID = 'no User ID entered';
  movieRankings = new Map();
  highestRank = 'no highest rank';
  movieEvent: MovieEvent | undefined;

  constructor(public apicall: ApicallService, private rankingService: RankingService, private router: Router, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    // First get the event id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    //console.log(routeParams);
    const eventIDFromRoute = String(routeParams.get('eventID'));
    console.log("eventIDFromRoute: " + eventIDFromRoute);

    // Find the event that correspond with the id provided in route.
    this.movieEvent = this.rankingService.getMovieEventByEventID(eventIDFromRoute);
    console.log("movieEvent: " + JSON.stringify(this.movieEvent));
    // the methods to get the movieEvent aren't firing again if returning to the same page, figure out where to put these method calls instead
  }

  /*
  navigate() {
    this.router.navigateByUrl('/events');
  }

  loadMovies() {
    if (environment.production === false) {
      this.Movie = <MovieItem[]>movielist
      console.log("fake array: " + JSON.stringify(this.Movie));
      return this.Movie;
    } else {
    return this.apicall.getMovies("Star Wars").subscribe((data) => {
      this.Movie = data;
      console.log(data);
      console.log(this.Movie[0]);
      })
    }
  }
  */

  drop(event: CdkDragDrop<{ title: string, image: string }[]>) {
    moveItemInArray(this.Movie, event.previousIndex, event.currentIndex);
  }

  submitUserID() {
    this.userID = this.value;
    console.log("User ID: " + this.userID);
  }

  rankMovies() {
    let points = this.Movie.length
    for (let i = 0; i < this.Movie.length; i++) {
      if (this.movieRankings.has(this.Movie[i].title)) {
        let newRanking = points + this.movieRankings.get(this.Movie[i].title)
        this.movieRankings.set(this.Movie[i].title, newRanking);
        points--;
      } else {
        this.movieRankings.set(this.Movie[i].title, points);
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
      console.log(entry[0], entry[1]);
    }
  }

}
