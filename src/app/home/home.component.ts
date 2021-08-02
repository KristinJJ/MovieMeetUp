import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { HttpClient } from '@angular/common/http';
import { MovieEvent } from '../event/event.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  movieEvents: MovieEvent[] = [];
  demoID = "DEMO";
  constructor(public apicall: ApicallService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadMovieEvents();
  }

  loadMovieEvents() {
    return this.apicall.getMovieEvents().subscribe((data) => {
      console.log(data);
      for (let index in data) {
        if (data[index].hostID == this.demoID) {
          this.movieEvents.push(data[index]);
        }
      }
      console.log(this.movieEvents);
      })
  }
}
