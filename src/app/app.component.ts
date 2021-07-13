import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApicallService } from './apicall.service';
import { OnInit } from '@angular/core';
import type { MovieItem } from "./movies";

/**
 * @title Drag&Drop custom preview
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Movie Ranking';
  Movie: MovieItem[] = [];

  constructor( public apicall: ApicallService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
   return this.apicall.getMovies("Star Wars").subscribe((data) => {
     this.Movie = data;
     console.log(data);
     console.log(this.Movie[0]);
   })
  }
  drop(event: CdkDragDrop<{title: string, image: string}[]>) {
    moveItemInArray(this.Movie, event.previousIndex, event.currentIndex);
  }
}


