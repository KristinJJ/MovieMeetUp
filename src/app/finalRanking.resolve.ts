import { templateJitUrl } from "@angular/compiler";
import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, UrlSegment, ParamMap} from "@angular/router";  
import { Observable } from "rxjs";  
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ApicallService } from "./apicall.service";  
import { MovieEvent } from './event/event.component';
import { RankingService } from "./ranking.service";

  
@Injectable({  
  providedIn: "any"
})
export class FinalRankingResolve implements Resolve<MovieEvent> {  
  routeParams: any;
  constructor(private apicall: ApicallService, private rankingService: RankingService, private router: ActivatedRoute) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<MovieEvent> {  
    console.log("the final ranking resolve has completed", route);
    this.routeParams = route.paramMap.get('eventID');
    console.log("eventID from resolve: ", this.routeParams);
    // how to get the url id from the paramMap???

    return this.apicall.getFinalRankings(this.routeParams);
    //return this.apicall.getFinalRankings("my6raivrzu");
    // how to pass the eventID to getFinalRankings??
  }
}