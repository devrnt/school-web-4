import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PinboardListComponent } from './pinboard/pinboard-list/pinboard-list.component';
import { PinboardService } from './services/pinboard.service';
import { HeaderComponent } from './shared/header/header.component';

import { RouterModule, Routes, Router } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PinboardDetailComponent } from './pinboard/pinboard-detail/pinboard-detail.component';
import { AddPostComponent } from './post/add-post/add-post.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { PinboardFilterPipe } from './pinboard/pinboard-list/pinboard-filter.pipe';
import { FooterComponent } from './shared/footer/footer.component';

import { AgmCoreModule } from '@agm/core';
import { PinboardMapsComponent } from './pinboard/pinboard-maps/pinboard-maps.component';



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
    PinboardDetailComponent,
    AddPostComponent,
    PinboardFilterPipe,
    FooterComponent,
    PinboardMapsComponent,
    
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } //debugging purpose only
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJvMuUr1PbYzQ3c5XA1tjrd4Z2hCO7QO8'
    })
  ],
  providers: [PinboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
