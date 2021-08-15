import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { RankingComponent } from "./ranking/ranking.component";
import { HomeComponent } from "./home/home.component";
<<<<<<< HEAD
import { FinalRankingComponent } from './finalRanking/final-ranking.component';
=======
import { MovieEventResolve } from './ranking.resolve';
>>>>>>> main

const routes: Routes = [
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
<<<<<<< HEAD
    { path: 'ranking/:eventID', component: RankingComponent },
    { path: 'event', component: EventComponent },
    { path: 'finalranking/:eventID', component: FinalRankingComponent }
=======
    { path: 'ranking/:eventID', component: RankingComponent, resolve: {movieEvent: MovieEventResolve} },
    { path: 'event', component: EventComponent }
>>>>>>> main
    /* add path for movie selection */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
