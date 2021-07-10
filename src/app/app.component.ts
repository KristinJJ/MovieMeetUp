import { Component } from '@angular/core';
//import * as Rx from "rxjs/Rx";
import { from, Observable } from 'rxjs';
import { Movies } from './movies';
import { ApicallService } from './apicall.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Movie: any = [];

  constructor( public apicall: ApicallService) {}

  ngOnInit() {
    this.loadMovies();
  }

  title = 'angular-test-app';
  //title = this.Movie[1];

 loadMovies() {
   return this.apicall.getMovies().subscribe((data: {}) => {
     this.Movie = data;
     console.log(data);
     // console.log(data[0].title) --> throws error
   })
 }
}


