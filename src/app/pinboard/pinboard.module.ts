import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PinboardListComponent } from './pinboard-list/pinboard-list.component';
import { PinboardDetailComponent } from './pinboard-detail/pinboard-detail.component';
import { PinboardMapsComponent } from './pinboard-maps/pinboard-maps.component';
import { AddPostComponent } from '../post/add-post/add-post.component';
import { PostComponent } from '../post/post/post.component';

import { PinboardFilterPipe } from './pinboard-list/pinboard-filter.pipe';

import { PinboardService } from '../services/pinboard.service';


import { httpInterceptorProviders } from '../http-interceptors/index';

import { environment } from '../../environments/environment';

// Google Maps
import { AgmCoreModule } from '@agm/core';
import { PinboardResolver } from './pinboard-resolver';

const routes: Routes = [
  { path: 'alle', component: PinboardListComponent },
  {
    path: ':stad',
    component: PinboardDetailComponent,
    resolve: { pinboard: PinboardResolver }
  }
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // Google Maps
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ],
  declarations: [
    PinboardListComponent,
    PinboardDetailComponent,
    PinboardMapsComponent,
    PinboardFilterPipe,
    AddPostComponent,
    PostComponent
  ],
  providers: [httpInterceptorProviders, PinboardService, PinboardResolver]

})
export class PinboardModule { }
