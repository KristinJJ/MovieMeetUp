import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DemoMaterialModule } from "./material.module";
import { FormsModule} from "@angular/forms";
import { EventComponent, IterablePipe } from './event/event.component';
import { RankingComponent } from "./ranking/ranking.component";
import { HomeComponent} from "./home/home.component";
import { TopNavComponent } from "./topNav/topNav.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MovieCardComponent} from "./movieCard/movieCard.component";
import { FinalRankingComponent } from './finalRanking/final-ranking.component';
import { ApicallService } from './apicall.service';
import { IntroComponent } from './intro/intro.component';
import { HeaderInterceptor } from './auth-interceptor';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { ScreenButtonComponent } from './screen-button/screen-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    EventComponent,
    RankingComponent,
    HomeComponent,
    TopNavComponent,
    MovieCardComponent,
    IterablePipe,
    FinalRankingComponent,
    IntroComponent,
    ScreenButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule, 
    DeferLoadModule
  ],
  providers: [
    ApicallService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    //{ provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
