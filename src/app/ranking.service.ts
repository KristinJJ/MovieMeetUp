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
        // make sure the hostID equals the demoID, and that the id does not already exist in the movieEvents array
       if ((data[index].hostID == demoID) && (data[index].id != (this.movieEvents.find(event => event.id == data[index].id))?.id)) {
          this.movieEvents.push(data[index]);
        }
      }
      console.log("Ranking service MovieEvents: " + this.movieEvents);
      })
  }

  getMovieEvents(){
    return this.movieEvents;
  }

  getMovieEventByEventID(demoID: String, eventID: String){
    this.loadMovieEventsByHostID(demoID);
    
    return this.movieEvents.find(event => event.id == eventID);
    /* if (this.movieEvents.length !== 0) {
      console.log("moviEvents != 0: "+ this.movieEvents.length);
      return this.movieEvents.find(event => event.id == eventID);
    } else {
      let mEvent;
      setTimeout(() => {
        console.log("awaiting movieEvents...");
        mEvent = this.movieEvents.find(event => event.id == eventID);
        
      }, 2000);
      console.log("trying again...?");
      return mEvent;
    } */
  }
}

