import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, MovieItem } from './movies';
//import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from "../environments/environment";

interface ItemsResponse {
  movies: Array<Movies>;
}

// TODO: securely save API Key as variable to include in api calls
// TODO: create variable for movie title from user entry in API call
      //: future api calls--imdb id for full movie details

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) {}

  // user variable = ""
  getMovies(movieName: string): Observable<MovieItem[]> {
    return this.http.get<Movies>(`https://imdb-api.com/en/API/SearchMovie/${environment.imdbApiKey}/${encodeURIComponent(movieName)}`).
        pipe(
          map((data) => {
            console.log(data);
            return data.results ?? [];
          })
        )
    }
  // getMovieDetails?
  // other api calls types?
  }


