import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PopMovieItem} from "../movies";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movieCard.component.html',
  styleUrls: ['./movieCard.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: PopMovieItem|undefined;
  @Output() notify = new EventEmitter();
  constructor() { }

  selected = false;
  onSelectCard() {
    this.selected = !this.selected;
  }

  ngOnInit(): void {
  }

}
