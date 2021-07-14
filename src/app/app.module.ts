import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { InputComponent } from "./input/input.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule} from '@angular/material/core';
import { CalendarComponent } from "./calendar/calendar.component";
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from "./material.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SampleComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    DemoMaterialModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
