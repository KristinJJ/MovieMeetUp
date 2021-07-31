import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PopMovieItem} from "../movies";
import { EventService } from "../event.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movieCard.component.html',
  styleUrls: ['./movieCard.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: PopMovieItem|undefined;
  @Output() notify = new EventEmitter();
  constructor(
    private eventService: EventService
  ) {}

  selected = false;
  onSelectCard(popMovieItem: PopMovieItem) {
    this.selected = !this.selected;
    if (this.selected == false) {
      this.eventService.removeMovieFromEvent(popMovieItem);
    } else {
      this.eventService.addMovieToEvent(popMovieItem);
    }
  }

  ngOnInit(): void {
  }

}
