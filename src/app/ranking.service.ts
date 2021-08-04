import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, MovieItem, PopMovies, PopMovieItem } from './movies';
import { MovieEvent } from './event/event.component';
import { ApicallService } from './apicall.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  movieEvents: MovieEvent[] = [];
  constructor(public apicall: ApicallService, private http: HttpClient) {}

  loadMovieEventsByHostID(demoID: String) {
    this.apicall.getMovieEvents().subscribe((data) => {
      console.log(data);
      for (let index in data) {
        if (data[index].hostID == demoID) {
          this.movieEvents.push(data[index]);
        }
      }
      console.log(this.movieEvents);
      })
  }

  getMovieEvents(){
    return this.movieEvents;
  }

  getMovieEventByEventID(eventID: String){
    return this.movieEvents.find(event => event.id == eventID);
  }
}

