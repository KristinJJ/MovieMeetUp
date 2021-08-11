import { Component, Input, OnInit } from '@angular/core';
import { RankUpdate } from '../ranking/ranking.component';

@Component({
  selector: 'app-event-ranking-details',
  templateUrl: './eventRankingDetails.component.html',
  styleUrls: ['./eventRankingDetails.component.scss']
})
export class EventRankingDetails implements OnInit {
  @Input() eventRankings!: RankUpdate[];
  constructor() { }

  ngOnInit(): void {
  }

}
