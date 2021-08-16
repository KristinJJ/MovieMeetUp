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
  movieTitle: String[] = [];
  points: (number | undefined)[] = [];
  constructor(private apicall: ApicallService) { }

  ngOnInit(): void {

    for (let ranking of this.eventRankings) {
      if (ranking.UserRankings) {
        this.userRanking = JSON.parse(JSON.stringify(ranking.UserRankings));
        // console.log("userRanking: ", typeof this.userRanking);
        if (this.userRanking) {
          console.log(this.userRanking.map((item) => item.points));
          this.points = this.userRanking.map((item) => item.points);
          }
          console.log(this.userRanking.map((item) => item.title));
          this.movieTitle = this.userRanking.map((item) => item.title);
          for (let index in this.userRanking) {
            //console.log("movie title: " + this.movieTitle[index] + " points: " + this.points[index]);
          }
          //console.log("points: ", points);
        } 
      }
      
    }
  }
