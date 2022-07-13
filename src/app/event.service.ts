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
/*  Will need to create a new interface for how we add things to Event.  
      --would this interface be in event.componet.ts or here?
    Adding a particular screening instead of
    all screenings....perhaps: if movieItem not in movies array, we push the EWMovieItem to the movies array, then replace
    Shows[0].shows with the selected screening?  If movieItem is already in array, then push just the chosen screening to
    that movieItem's shows array.
    For removing, essentially the reverse--if MovieItem shows array length is 1, then remove movie item. else remove the
    specified screening id rom that movieItem's shows array.
*/

  addFilteredMoviesToEvent(movieArr: EWMovieItem[]) {
    // if there are already movies in array when function called, reset array first
    if(this.movies.length > 0) {
      this.movies = [];
    }
    // make this.movies equal the passed array
    this.movies = movieArr;
    console.log("add date array to eventMovies: ", this.movies);
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


