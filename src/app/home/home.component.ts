import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { HttpClient } from '@angular/common/http';
import { MovieEvent, EventComponent } from '../event/event.component';
import { RankingService } from '../ranking.service';
import { environment } from 'src/environments/environment';
import jwtDecode, { JwtPayload }  from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';



export interface JwtPayloadCognito extends JwtPayload {
  preferred_username: string;
}

@Component({
  providers:[EventComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  movieEvents: MovieEvent[] = [];
  logoutURL= environment.logoutURL;
  // url that gets sent in the email for users to rank selected movies in events
  //url = 'https://moviemeetup.com/ranking/';
  url = 'https://localhost:4200/ranking/';
  //today: any;
  //date = new Date();
  host = sessionStorage.getItem('hostID');
  firstLoad = true;
  

  constructor(private eventComponent: EventComponent, public apicall: ApicallService, private router: Router, private rankingService: RankingService, private httpClient: HttpClient, private route: ActivatedRoute) {
    };

    

  ngOnInit(): void {

    console.log("session storage-host: "+ sessionStorage.getItem('hostID'));
    console.log("firstLoad: ", this.firstLoad);
    this.rankingService.loadMovieEventsByHostID(String(sessionStorage.getItem('hostID')));
    this.movieEvents = this.rankingService.getMovieEvents();
    setTimeout(() => { 
      //console.log(this.getEventTitles("ulscnsf5f5"));
      console.log('user events: ', this.movieEvents.length);
      this.firstLoad = false;
      console.log("firstLoad: ", this.firstLoad);
    }, 3000);  
    //this.today = this.eventComponent.hoursConvert(this.date.getTime().toString());
    //console.log("today?: ", this.today);
  }

  getEventTitles(eventID: string | undefined): string {
    let movietitles: any[] = [];
    let targetEvent = this.movieEvents.filter((elem) => elem.id === eventID);
    //console.log(targetEvent);
    let targetmovs = targetEvent[0].eventMovies;
    for (let title of targetmovs!) {
      movietitles.push(title.title);
    }
    //console.log("title array?", movietitles);

    return movietitles.join(', ');
    //}

  }

}
