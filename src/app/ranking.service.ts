import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies, MovieItem, PopMovies, PopMovieItem, EWMovieItem } from './movies';
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

  // Loads all events created by hostID for the homepage
  async loadMovieEventsByHostID(demoID: String): Promise<MovieEvent[]> {
    (await this.apicall.getMovieEvents()).subscribe((data) => {
      console.log('lmebi: ', data);
      for (let index in data) {
        // make sure the hostID equals the demoID, and that the id does not already exist in the movieEvents array
        if ((data[index].hostID == demoID) && (data[index].id != (this.movieEvents.find(event => event.id == data[index].id))?.id)) {
          console.log(data[index].eventDate);
          console.log(Date.parse(data[index].eventDate));
          this.movieEvents.push(data[index]);
        }
      }
    });
    console.log('RankingService-getMovieEventsByHostID completed: ' + this.movieEvents); 
 
    
    
    return this.movieEvents;
  }

  /*findMovieEventByEventID(hostID: String, eventID: String) {
    console.log(this.movieEvents);
    let temp: MovieEvent | undefined;
    for (let index in this.movieEvents) {
      // make sure the hostID and eventIDs match
     if ((this.movieEvents[index].hostID == hostID && this.movieEvents[index].id == eventID )) {
         temp = this.movieEvents[index];
         console.log("found it!");
      }
    }
    console.log(temp);
    return temp;
  }*/

  // attempt to sort movie events on the homepage by date of event -- no luck, however...
  getMovieEvents(){
    //this.movieEvents.sort((a,b) => (a.eventDate > b.eventDate) ? 1 : ((b.eventDate > a.eventDate) ? -1 : 0));
    this.movieEvents.sort((a,b) => {
      var dateA = Date.parse(a.eventDate);
      var dateB = Date.parse(b.eventDate);
      return dateA < dateB ? 1 : -1;
    })
    return this.movieEvents;
  }

  separateScreenings(movieItemArray: EWMovieItem[]): (EWMovieItem)[] {
    let single: EWMovieItem;
    let repArray: EWMovieItem[] = [];
    for (let movie of movieItemArray) {
      console.log(movie.title, movie.shows[0].show.length);
      if (movie.shows[0].show.length == 1) {
        repArray.push(movie);
      } else {
        for(let screening of movie.shows[0].show) {
          single = JSON.parse(JSON.stringify(movie));
          console.log('screening:', screening.timestamp);
          single.shows[0].show[0] = screening;
          repArray.push(single);
        }
      }
    }
    return repArray;
  }

  unixConvert(unix: string): string {
    let show = new Date(parseInt(unix) * 1e3).toISOString().substring(0, 23);
    //console.log('show: ', show);
    let showTime = new Date(show).toString();
    //console.log("showTime: " + showTime);
    let strDay = showTime.substring(0, 3);
    let date = new Date(show);
    //console.log('date: ', date);
    //let day = date.getDate();
    let day = showTime.substring(8, 10);
    //let month = date.getMonth() + 1;
    let strMonth = showTime.substring(4, 7);
    //let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let zminutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + zminutes + ' ' + ampm;
    return `${strDay} ${strMonth} ${day} - ${strTime}`;
  }
}

