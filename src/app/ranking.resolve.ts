import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { environment } from "src/environments/environment";
import { ApicallService } from "./apicall.service";  
import { MovieEvent } from './event/event.component';
import { RankingService } from "./ranking.service";

  
@Injectable({  
  providedIn: "any"
})
export class MovieEventResolve implements Resolve<MovieEvent> {  
  routeParams: any;
  constructor(private apicall: ApicallService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<MovieEvent> {  
    //console.log("the ranking resolve has completed");
    //return this.apicall.getMovieEvents();

    console.log("the ranking resolve has completed", route);
    this.routeParams = route.paramMap.get('eventID');
    console.log("eventID from resolve: ", this.routeParams);

    return this.apicall.getMovieEvent(this.routeParams);
  }  
}