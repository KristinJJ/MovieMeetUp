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
export class MovieEventResolve implements Resolve<MovieEvent[]> {  
  constructor(private apicall: ApicallService, private rankingService: RankingService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<MovieEvent[]> {  
    console.log("the resolve has completed");
    return this.apicall.getMovieEvents();
  }  
}