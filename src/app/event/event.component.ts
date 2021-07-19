import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { MovieItem } from "../movies";
import { Router, RouterModule } from '@angular/router';
import { FormControl, NgModel } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Pipe, PipeTransform } from '@angular/core';


interface MovieEvent {
  eventID: string;
  eventTitle: string;
  eventDate: string;
  movies?: (MovieItem) [] | null;
  //invitees?: (EventInvitees) [] | null;
  //movieRankings?: (movieRankings) [] | null;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

@Injectable()
export class EventComponent implements OnInit {
  eventID = '';
  eventTitle = '';
  eventDate = '';
  events = new Map();
  eventMovies = [];
  invitees = [];
  movieRankings = [];
  value = '';

 
  constructor() {}

  ngOnInit(): void {
  }

  setTitle() {
    this.eventTitle = this.value;
    console.log("New Event: " + this.eventTitle);
  }


  setDate(event: MatDatepickerInputEvent<Date>) {
    this.eventDate = `${event.value}`.substring(0, 16);
    console.log("New EventDate: " + this.eventDate);
  }

  createEvent() { // TO ADD: CONTENT VERIFICATION
    // Create new eventID: sets eventID to be 1 larger than current events map size,
    //   with added random number to prevent overwriting, should a previous event be deleted
    this.eventID = `${this.events.size+1}` + '-' + `${Math.floor(Math.random()*1000)}`;
    console.log(this.eventID);
    // Create newEvent object of MovieEvent type with the provided elements
    let newEvent: MovieEvent = {
      eventID : this.eventID,
      eventTitle : this.eventTitle,
      eventDate : this.eventDate
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
    this.eventTitle = '';
    this.eventDate = '';
    return newEvent;
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

// methods needed:
  // create new event (constructor)
      // creates event with an id and date (date picker?) required.

  // search for movies    
      // moves to searching for movies to add.
          // would need to have add button for each movie object in table
              // add button would add movie to eventMovies array
  // add invitees to invitees
  // find existing event
  // update existing event
  // update movieRankings (when invitee does their ranking)


// Event JSON
  /* "eventID": "string",
	"eventDate": "string",
	"movies": [
		{
			"movieID": "string",
			"image": "string",
			"title": "string",
			"description": "string"
		}
	],
	"invitees": [
		{
			"userID": "string",
			"firstName": "string",
			"lastName": "string",
			"email": "string",
			"rankDone": "boolean"
		}
	],
	"rankings": [ 
		{
			"userID": "string",
			"rankedMovies": {
				"movieID": "string",
				"title": "string",
				"score": "number"
			}
		}
	] */