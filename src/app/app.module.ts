import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PinboardListComponent } from './pinboard/pinboard-list/pinboard-list.component';
import { PinboardService } from './services/pinboard.service';
import { HeaderComponent } from './shared/header/header.component';

import { RouterModule, Routes, Router } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PinboardDetailComponent } from './pinboard/pinboard-detail/pinboard-detail.component';


const appRoutes: Routes = [
  { path: 'prikborden', component: PinboardListComponent },
  { path: '', redirectTo: '/prikborden', pathMatch: 'full' },
  { path: 'prikbord/:stad', component: PinboardDetailComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PinboardListComponent,
    HeaderComponent,
    PageNotFoundComponent,
    PinboardDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } //debugging purpose only
    )
  ],
  providers: [PinboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
