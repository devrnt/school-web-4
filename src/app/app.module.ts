import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PinboardListComponent } from './pinboard/pinboard-list/pinboard-list.component';
import { PinboardService } from './services/pinboard.service';
import { HeaderComponent } from './shared/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    PinboardListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PinboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
