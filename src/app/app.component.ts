import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApicallService } from './apicall.service';
import { OnInit } from '@angular/core';
import type { MovieItem } from "./movies";
import { Router } from '@angular/router';

/**
 * @title Drag&Drop custom preview
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Movie Ranking';
  Movie: MovieItem[] = [];
  value = '';
  userID = 'no User ID entered';
  movieRankings = new Map();
  highestRank = 'no highest rank';

  constructor(public apicall: ApicallService, private router: Router) {
  }

  ngOnInit() {
    this.loadMovies();
  }

  navigate() {
    this.router.navigateByUrl('/events');
  }

  loadMovies() {
    return this.apicall.getMovies("Star Wars").subscribe((data) => {
      this.Movie = data;
      console.log(data);
      console.log(this.Movie[0]);
    })
  }

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
