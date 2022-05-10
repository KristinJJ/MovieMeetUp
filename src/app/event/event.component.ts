import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { MovieItem, PopMovieItem, EWMovieItem } from "../movies";
import { ApicallService } from '../apicall.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, NgModel, Validators } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from "../event.service";
import { RankUpdate } from '../ranking/ranking.component';

// @ts-ignore
//import { onScan } from "../../../popMoviesScan.js";

export interface MovieEvents {
  searchType: string;
  expression: string;
  Items?: (MovieEvent)[] | null;
  errorMessage: string;
}

// Modified for EW Movie info
export interface MovieEvent {
  id?: string;
  hostID: string;
  eventTitle: string;
  eventDate: string;
  eventMovies?: (EWMovieItem) [];
  selectedMovies: EWMovieItem[];
  //invitees?: (EventInvitees) [] | null;
  eventRankings?: (RankUpdate) [];
  finalRankings?: (EWMovieItem) [];
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

@Injectable()
export class EventComponent implements OnInit {
  sessionhostID = sessionStorage.getItem('hostID');
  hostID = '';
  eventID = '';
  eventTitle = '';
  eventDate = '';
  selectedMovies: EWMovieItem[] = [];
  events = new Map();
  eventMovies: EWMovieItem[] = [];
  invitees = [];
  movieRankings = [];
  errormsg = '';
  confmsg = '';
  public confirmed = false;
  date = new FormControl(new Date());
  gridColumns = 3;
  minDate = new Date();

  constructor(public apicall: ApicallService, private eventService: EventService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadEWMovies();
    // set minDate for datepicker to be 'tomorrow'--no past dates or picking today.
    this.minDate.setDate(this.minDate.getDate() +1);
  }

  // CALL SCAN API GATEWAY HERE? --> https://ri86qpqtti.execute-api.us-west-2.amazonaws.com/popMovies
  // Attempt to create a function that references the getPopMovies from the apicallservice. This is probably the wrong way?
  // Current gives CORS error and the GET fails.
  loadEWMovies() {
    console.log("loadEWMovies called");
    return this.apicall.getEWMovies().subscribe((data) => {
      this.eventMovies = data;
      console.log("loadEWMovies data:", this.eventMovies);
      })
  }

  setDate(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.eventDate = `${event.value}`.substring(0, 15);
    console.log("New EventDate: " + this.eventDate);
  }

  confmessage(): void {
    this.confirmed = true;
    console.log("confirmed: " + this.confirmed);
    setTimeout(() => {
      this.confirmed = false;
      console.log("confirmed: " + this.confirmed);
    }, 4000);
  }

  createEvent() { // TO ADD: CONTENT VERIFICATION
    if (this.sessionhostID !== null) {
      this.hostID = this.sessionhostID
    };
    
    if (this.hostID === '' || this.eventTitle === '' || this.eventDate === '') {
      this.errormsg = 'You must enter a Host ID, an Event Title, and select a Date.';
      return;
    } if (this.eventDate === null) {
      this.errormsg = 'You must select an actual Date.';
      return;
    } if (this.eventService.getNumSelected() < 3) {
      this.errormsg = 'You must select at least three Movies.';
      return;
    }

    // Create new eventID: sets eventID to be 1 larger than current events map size,
    //   with added random number to prevent overwriting, should a previous event be deleted
    //this.eventID = `${this.events.size+1}` + '-' + `${Math.floor(Math.random()*1000)}`;
    //console.log(this.eventID);
    
    // Create newEvent object of MovieEvent type with the provided elements
    let newEvent: MovieEvent = {
      hostID: this.hostID,
      eventTitle : this.eventTitle,
      eventDate : this.eventDate,
      selectedMovies : [...this.eventService.getSelectedMovies()]
    };
    // Verify newEvent object created with correct info successfully
    console.log(JSON.stringify(newEvent));

    // Add MovieEvent object to the events map, with the eventID as a key
    this.events.set(this.eventID, newEvent);
    // Verify MovieEvent was added to events map
    console.log(this.events.get(this.eventID));

    // Display all MovieEvent objects in the events map
    for (let entry of this.events.entries()) {
      console.log(entry[0], entry[1].eventTitle);
    }
    this.events.forEach((value: string, key: string) => {
      console.log("KV: " + key, value);
    })
    this.apicall.addMovieEvent(newEvent).subscribe();
    this.eventTitle = '';
    this.eventDate = '';
    this.errormsg = '';
    this.date = new FormControl(new Date());
    this.eventService.resetMovieArray();
    this.confmsg = `Your "${newEvent.eventTitle}" event has been created!`;
    this.confmessage();
    //return newEvent;
  }
}



// Pipe added to get ngFor to work with mab iterables
@Pipe({
  name: 'iterable'
})
export class IterablePipe implements PipeTransform {
  transform(iterable: any, args: any[]): any {
    let result = [];

    if (iterable.entries) {
      iterable.forEach((key: any, value: any) => {
        result.push({ key, value });
      });
    } else {
      for (let key in iterable) {
        if (iterable.hasOwnProperty(key)) {
          result.push({ key, value: iterable[key] });
        }
      }
    }

    return result;
  }
}


