import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Services
import { PlumbersService } from './plumbers.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PlumbersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
