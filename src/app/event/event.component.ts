import { Component, OnInit } from '@angular/core';
import type { MovieItem } from "../movies";

interface MovieEvent {
  eventID: string;
  eventDate: string;
  movies?: (MovieItem) [] | null;
  invitees?: (EventInvitees) [] | null;
  movieRankings?: (movieRankings) [] | null;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventID = '';
  eventDate = '';
  events = new Map();
  eventMovies = [];
  invitees = [];
  movieRankings = [];

  // Creates EventComponent, with req id and date paramaters
  constructor(eventID: string, eventDate: string) { 
    eventID = this.eventID;
    eventDate= this.eventDate;
  }

  ngOnInit(): void {
  }

  createEvent(eventDate: string) {
    // sets eventID to be 1 larger than current size, with added random number to prevent
    //   overwriting should a previous event be deleted
    this.eventID = `${this.events.size+1} + '-' + ${Math.random()*100}`;
    this.eventDate = eventDate;

    // create newEvent with the provided variables above and adds to the events map.
    let newEvent = new EventComponent(this.eventID, this.eventDate )
    this.events.set(this.eventID, newEvent);  
  }


}

// methods needed:
  // create new event (constructor)
      // creates event with an id and date (date picker?) required.

  // search for movies    
      // moves to searching for movies to add.
          // would need to have add button for each movie object in table
              // add button would add movie to eventMovies
  // add movies to eventMovies (via add button)
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