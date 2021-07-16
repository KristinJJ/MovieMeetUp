import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApicallService } from './apicall.service';
import { OnInit } from '@angular/core';
import type { MovieItem } from "./movies";

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

  constructor( public apicall: ApicallService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
   return this.apicall.getMovies("Star Wars").subscribe((data) => {
     this.Movie = data;
     console.log(data);
     console.log(this.Movie[0]);
   })
  }

  drop(event: CdkDragDrop<{title: string, image: string}[]>) {
    moveItemInArray(this.Movie, event.previousIndex, event.currentIndex);
  }

  submitUserID() {
    this.userID = this.value;
    console.log("User ID: " + this.userID);
  }

  rankMovies() {
    for (let i = this.Movie.length - 1; i > 0; i--) {
      if (this.movieRankings.has(this.Movie[i].title)) {
        let newRanking = i + this.movieRankings.get(this.Movie[i].title)
        this.movieRankings.set(this.Movie[i].title, newRanking);
        console.log("movie title was found");
      } else {
        this.movieRankings.set(this.Movie[i].title, i);
        console.log("movie title was not found");
      }
    }
  }

  findTopMovie() {
    let topMovie = '';
    let minValue = 10000;
    for (let key of this.movieRankings.keys()) {
      let newValue = this.movieRankings.get(key);
      if (newValue < minValue) {
        minValue = newValue;
        topMovie = key;
      }
    }
    return topMovie;
  }

  submitRanking() {
    this.rankMovies();
    console.log("Highest rank: " + this.findTopMovie());

    console.log("User ID: " + this.userID);
    for (let i = 0; i < this.Movie.length; i++) {
      console.log("ranking: " + i);
      console.log(this.Movie[i].id);
      console.log(this.Movie[i].title);
    }
  }
}


