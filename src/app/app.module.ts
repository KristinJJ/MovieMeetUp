import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from "./material.module";
import { FormsModule} from "@angular/forms";
import { EventComponent, IterablePipe } from './event/event.component';
import { RankingComponent } from "./ranking/ranking.component";
import { HomeComponent} from "./home/home.component";
import { TopNavComponent } from "./topNav/topNav.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MovieCardComponent} from "./movieCard/movieCard.component";

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    EventComponent,
    RankingComponent,
    HomeComponent,
    TopNavComponent,
    MovieCardComponent,
    IterablePipe /* added for map template displaying */
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
