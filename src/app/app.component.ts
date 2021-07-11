import { Component } from '@angular/core';
//import * as Rx from "rxjs/Rx";
import { from, Observable } from 'rxjs';
import { Movies } from './movies';
import { ApicallService } from './apicall.service';
import { OnInit } from '@angular/core';
import type { MovieItem } from "./movies";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Movie: MovieItem[] = [];

  constructor( public apicall: ApicallService) {}

  ngOnInit() {
    this.loadMovies();
  }

  title = 'angular-test-app';
  

 loadMovies() {
   return this.apicall.getMovies("Star Wars").subscribe((data) => {
     this.Movie = data;
     console.log(data);
     console.log(this.Movie[0]);
     //this.title = this.Movie.results[0].title;
   })
 }
 //console.log(Movie);
 
}


