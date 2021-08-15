import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, MovieItem, PopMovies, PopMovieItem } from './movies';
import { MovieEvent } from './event/event.component';
import { ApicallService } from './apicall.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  movieEvents: MovieEvent[] = [];
  constructor(public apicall: ApicallService, private http: HttpClient) {}

  loadMovieEventsByHostID(demoID: String): MovieEvent[] {
    this.apicall.getMovieEvents().subscribe((data) => {
      //console.log(data);
      for (let index in data) {
        // make sure the hostID equals the demoID, and that the id does not already exist in the movieEvents array
        if ((data[index].hostID == demoID) && (data[index].id != (this.movieEvents.find(event => event.id == data[index].id))?.id)) {
          this.movieEvents.push(data[index]);
        }
      }
    }); 
    return this.movieEvents;
  }

  getMovieEvents(){
    return this.movieEvents;
  }
}

