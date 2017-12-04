import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Services
import { PlumbersService } from './plumbers/plumbers.service';
import { PlumberScheduleService } from './plumber-schedules/plumber-schedules.service';

import { AppComponent } from './app.component';
import { PlumbersComponent } from './plumbers/plumbers.component';
import { HirePlumberComponent } from './hire-plumber/hire-plumber.component';
import { PlumberSchedulesComponent } from './plumber-schedules/plumber-schedules.component';
import { RegisterPlumberComponent } from './register-plumber/register-plumber.component';


@NgModule({
  declarations: [
    AppComponent,
    PlumbersComponent,
    HirePlumberComponent,
    PlumberSchedulesComponent,
    RegisterPlumberComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    PlumbersService,
    PlumberScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
