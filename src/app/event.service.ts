import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, MovieItem, PopMovies, PopMovieItem, EWMovies, EWMovieItem } from './movies';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  movies: EWMovieItem[] = [];
  constructor(private http: HttpClient) {}

  getNumSelected() {
    return this.movies.length;
  }

  getSelectedMovies() {
    return this.movies;
  }

  addMovieToEvent(ewMovieItem: EWMovieItem) {
    this.movies.push(ewMovieItem);
    console.log(this.movies);
  }

  removeMovieFromEvent(ewMovieItem: EWMovieItem) {
    for (let i = this.movies.length - 1; i >= 0; --i) {
      if (this.movies[i] == ewMovieItem) {
        this.movies.splice(i,1);
      }
    }
    console.log(this.movies);
  }

  resetMovieArray() {
    this.movies.length = 0;
    console.log("selected movies cleared");
    return this.movies;
    
  }

}


