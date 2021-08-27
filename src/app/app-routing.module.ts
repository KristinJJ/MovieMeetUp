import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { RankingComponent } from "./ranking/ranking.component";
import { HomeComponent } from "./home/home.component";
import { MovieEventResolve } from './ranking.resolve';
import { FinalRankingResolve } from './finalRanking.resolve';
import { FinalRankingComponent } from './finalRanking/final-ranking.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
    { path: 'home', pathMatch: 'full', component: HomeComponent },
   // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'ranking/:eventID', component: RankingComponent, resolve: {movieEvent: MovieEventResolve} },
    { path: 'event', component: EventComponent },
    { path: 'finalranking/:eventID', component: FinalRankingComponent, resolve: {movieEvent: MovieEventResolve} },
    { path: 'intro', component: IntroComponent }
    /* add path for movie selection */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
