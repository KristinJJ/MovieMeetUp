import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from './movies';
//import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface ItemsResponse {
  movies: Array<Movies>;
}

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(`https://imdb-api.com/en/API/SearchMovie/k_rnch4z33/Star%20Wars`).
        pipe(
          //map(result=>result.movies)
           map((data: Movies[]) => {
             console.log(data);
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
        
    }
  // getMovieDetails?
  // other api calls types?
  }


