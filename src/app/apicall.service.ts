import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movies, MovieItem, PopMovies, PopMovieItem } from './movies';
//import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from "../environments/environment";
import { MovieEvents, MovieEvent } from "../app/event/event.component";
import { RankUpdate } from '../app/ranking/ranking.component';

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
          console.log("getPopMovies() data.Items: " + data.Items);
          return data.Items ?? [];
        })
      )
  }

  // adds created event to the Event DynamoDB table
  addMovieEvent(body: MovieEvent) : Observable<MovieEvent[]> {
    const headers = new HttpHeaders()
    /* .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set("Access-Control-Allow-Methods", "OPTIONS,POST,PUT,GET"); */
      headers.append('Origin','http://localhost:4200')
      .append("Accept", "appliction/json")
      .append("Content-Type", "application/json");
  
    return this.http.put<MovieEvent>('https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/events', body, { 'headers': headers })
    .pipe(
      map((data) => {
        //console.log('body: ' + JSON.parse(body.eventTitle));
        console.table(data);
        console.log('data: ' + JSON.stringify(data,null,2));
        return JSON.stringify(data);
        return JSON.parse(data.eventTitle);
      })
    )
  }

  // Add user SelectedRankings to the indicated eventid in the DynamoDb Event table
  addUserRankings(body: RankUpdate): Observable<RankUpdate> {
    const headers = new HttpHeaders()
      headers.append('Origin','http://localhost:4200')
      .append("Accept", "appliction/json")
      .append("Content-Type", "application/json");

    return this.http.put<RankUpdate>('https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/user-rankings', body, { 'headers': headers })  
  }

  // get Event data from DynamoDB
  getMovieEvents() : Observable<MovieEvent[]> {
    return this.http.get<MovieEvents>('https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/movieevents-scan').
      pipe(
        map((data) => {
          //console.log(data);
          console.log("ApiService- getMovieEvents() completed");
          return data.Items ?? [];
        })
      )
  }

  // get Event data from DynamoDB
  // return the Event by eventID
  getMovieEvent(id: string): Observable<MovieEvent> {
    //console.log("id for queryStringParameters:", id);
    const options = id ? 
    { params : new HttpParams().set('id', id)} : {};
    console.log("options for the MovieEvent: ", options);
    return this.http.get<MovieEvent>(`https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/getMovieEvent`, options).
      pipe(
        map((data) => {
          console.log(data);
          console.log("getMovieEvent() data: " + JSON.stringify(data));
          return data ?? [];
        })
      )
  }

  // get FinalRanking data from DynamoDB
  // return the Final Rankings for an Event by eventID
  getFinalRankings(id: string): Observable<MovieEvent> {
    //console.log("id for queryStringParameters:", id);
    const options = id ? 
    { params : new HttpParams().set('id', id)} : {};
    console.log("options for the FinalRanking: ", options);
    return this.http.get<MovieEvent>(`https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/getFinalRankings`, options).
      pipe(
        map((data) => {
          console.log(data);
          console.log("getFinalRankings() data: " + data);
          return data ?? [];
        })
      )
  }
}