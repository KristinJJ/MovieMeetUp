import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { PopMovieItem } from '../movies';
import { RankUpdate } from '../ranking/ranking.component';
import { ApicallService } from '../apicall.service';

@Component({
  selector: 'app-event-ranking-details',
  templateUrl: './eventRankingDetails.component.html',
  styleUrls: ['./eventRankingDetails.component.scss']
})
export class EventRankingDetails implements OnInit {
  @Input() eventRankings!: RankUpdate[];

  userRanking: PopMovieItem[] = [];
  movieTitles: String[] = [];
  points: (number | undefined)[] = [];
  rankings = new Map();
  IDs: string[] = [];
  images: string[] = [];
  constructor(private apicall: ApicallService) { }

  ngOnInit(): void {

    console.log("EventRankings: ", this.eventRankings);
    for (let ranking of this.eventRankings) {
      if (ranking.UserRankings) {
        this.userRanking = JSON.parse(JSON.stringify(ranking.UserRankings));
        // console.log("userRanking: ", typeof this.userRanking);
        if (this.userRanking) {
          console.log(this.userRanking.map((item) => item.id));
          this.IDs = this.userRanking.map((item) => item.id);
          console.log(this.userRanking.map((item) => item.points));
          this.points = this.userRanking.map((item) => item.points);
          console.log(this.userRanking.map((item) => item.title));
          this.movieTitles = this.userRanking.map((item) => item.title);
          console.log(this.userRanking.map((item) => item.image));
          this.images = this.userRanking.map((item) => item.image);
          for (let index in this.points) {
            this.rankings.set(this.IDs[index], {points: this.points[index], movieTitles: this.movieTitles[index], image: this.images[index]});
            console.log(this.rankings);
          }
        }
       
      }
    }
  }
}
