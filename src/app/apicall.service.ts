import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, MovieItem, PopMovies, PopMovieItem } from './movies';
//import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from "../environments/environment";
import { MovieEvents, MovieEventItem } from "../app/event/event.component";

interface ItemsResponse {
  movies: Array<Movies>;
  popMovies: Array<PopMovies>;
}

// TODO: securely save API Key as variable to include in api calls
// TODO: create variable for movie title from user entry in API call
      //: future api calls--imdb id for full movie details

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  httpClient: any;

  constructor(private http: HttpClient) {}

  // user variable = ""
  getMovies(movieName: string): Observable<MovieItem[]> {
    return this.http.get<Movies>(`https://imdb-api.com/en/API/SearchMovie/${environment.imdbApiKey}/${encodeURIComponent(movieName)}`).
        pipe(
          map((data) => {
            console.log(data);
            console.log("getMovies() data.results: " + data.results);
            return data.results ?? [];
          })
        )
    }
  // getMovieDetails?
  // other api calls types?

    // attempt to create a function to call the API Gateway, to pass to the event.component.ts?
  getPopMovies() : Observable<PopMovieItem[]> {
    return this.http.get<PopMovies>('https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/popMovies').
      pipe(
        map((data) => {
          console.log(data);
          console.log("getPopMovies() data.results: " + data.Items);
          return data.Items ?? [];
        })
      )
  }
  
  
  addMovieEvent() : Observable<MovieEventItem[]> {
    return this.http.put<MovieEvents>('https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/events', body)
    
    );
  }

}


