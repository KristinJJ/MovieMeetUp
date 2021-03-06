import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, MovieItem, PopMovies, PopMovieItem } from './movies';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  movies: PopMovieItem[] = [];
  constructor(private http: HttpClient) {}

  getNumSelected() {
    return this.movies.length;
  }

  getSelectedMovies() {
    return this.movies;
  }

  addMovieToEvent(popMovieItem: PopMovieItem) {
    this.movies.push(popMovieItem);
    console.log(this.movies);
  }

  removeMovieFromEvent(popMovieItem: PopMovieItem) {
    for (let i = this.movies.length - 1; i >= 0; --i) {
      if (this.movies[i] == popMovieItem) {
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


