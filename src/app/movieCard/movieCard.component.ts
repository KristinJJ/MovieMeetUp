import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PopMovieItem, EWMovieItem} from "../movies";
import { EventService } from "../event.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movieCard.component.html',
  styleUrls: ['./movieCard.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: EWMovieItem|undefined;
  @Output() notify = new EventEmitter();

  show = false;
  selected = false;

  constructor(
    private eventService: EventService
  ) {}

  onSelectCard(ewMovieItem: EWMovieItem) {
    this.selected = !this.selected;
    if (this.selected == false) {
      this.eventService.removeMovieFromEvent(ewMovieItem);
    } else {
      this.eventService.addMovieToEvent(ewMovieItem);
    }
  }

  ngOnInit(): void {
  }

}
