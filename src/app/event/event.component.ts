import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { MovieItem } from "../movies";

interface MovieEvent {
  eventID: string;
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
  eventDate = '';
  events = new Map();
  eventMovies = [];
  invitees = [];
  movieRankings = [];

 
  constructor() {}


  ngOnInit(): void {
  }

  createEvent(eventDate: string) {
    // create newEvent with the provided variables above and adds to the events map.
    let newEvent = new EventComponent();
    // sets eventID to be 1 larger than current size, with added random number to prevent
    //   overwriting, should a previous event be deleted
    newEvent.eventID = `${this.events.size+1} + '-' + ${Math.random()*100}`;
    newEvent.eventDate = eventDate;

    
    
    this.events.set(this.eventID, newEvent);  
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