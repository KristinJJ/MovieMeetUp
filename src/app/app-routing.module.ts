import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { RankingComponent } from "./ranking/ranking.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'ranking', pathMatch: 'full', component: RankingComponent },
    { path: 'event', component: EventComponent }
    /* add path for movie selection */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
