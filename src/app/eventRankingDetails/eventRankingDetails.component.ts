import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { PopMovieItem } from '../movies';
import { RankUpdate } from '../ranking/ranking.component';

@Component({
  selector: 'app-event-ranking-details',
  templateUrl: './eventRankingDetails.component.html',
  styleUrls: ['./eventRankingDetails.component.scss']
})
export class EventRankingDetails implements OnInit {
  @Input() eventRankings!: RankUpdate[];

  rankings: number[] | undefined;
  userRanking: PopMovieItem[] = [];
  constructor() { }

  ngOnInit(): void {
    
    for (let ranking of this.eventRankings) {
      if (ranking.UserRankings) {
        this.userRanking = JSON.parse(JSON.stringify(ranking.UserRankings));
        console.log("userRanking: ", typeof this.userRanking);
        if (this.userRanking) {
          let points = this.userRanking.map((item) => item.points);
          console.log("points: ", points);
          if (points) {
            //this.rankings.push(points);
          };
        } 
      }
      
    }
  }

}
