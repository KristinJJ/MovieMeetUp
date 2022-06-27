import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PopMovieItem, EWMovieItem, Screening} from "../movies";
import { EventService } from "../event.service";

@Component({
  selector: 'app-screen-button',
  templateUrl: './screen-button.component.html',
  styleUrls: ['./screen-button.component.scss']
})
export class ScreenButtonComponent implements OnInit {
  @Input() movie!: EWMovieItem;
  @Input() item!: Screening|undefined;
  @Output() notify = new EventEmitter();

  show = false;
  buttonSel = false;

  constructor(private eventService: EventService) { }

  onSelectScreening(screening: Screening, movie: EWMovieItem) {
    this.buttonSel = !this.buttonSel;
    console.log(this.buttonSel);
    if (this.buttonSel == false) {
      console.log("remove screening: " + JSON.stringify(screening));
      this.eventService.removeScreeningFromEvent(movie, screening);
  } else {
      console.log("add screening: " + JSON.stringify(screening));
      console.log("add movie: " + JSON.stringify(movie));
      this.eventService.addScreeningToEvent(movie, screening);
    }
  }

  unixConvert(unix: string): string {
    let show = new Date(parseInt(unix) * 1e3).toISOString().substring(0, 23);
    let showTime = new Date(show).toString();;
    //console.log("showTime: " + showTime);
    let strDay = showTime.substring(0, 3);
    let date = new Date(show);
    let day = date.getDate();
    //let month = date.getMonth() + 1;
    let strMonth = showTime.substring(4, 7);
    //let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let zminutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + zminutes + ' ' + ampm;
    return `${strDay} ${strMonth} ${day} - ${strTime}`;
  }

  ngOnInit(): void {
  }

}
