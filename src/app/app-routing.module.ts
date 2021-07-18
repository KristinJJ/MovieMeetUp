import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import {RankingComponent} from "./ranking/ranking.component";

const routes: Routes = [
    { path: 'ranking', pathMatch: 'full', component: RankingComponent },
    { path: '', redirectTo: '/ranking', pathMatch: 'full' },
    { path: 'event', component: EventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
