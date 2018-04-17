import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

import { AuthGuardService } from '../user/auth-guard.service';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';

const appRoutes: Routes = [
  {
    path: 'prikbord',
    canActivate: [AuthGuardService],
    loadChildren: '../pinboard/pinboard.module#PinboardModule',
    data: { preload: true }
  },
  { path: '', redirectTo: 'prikbord/alle', pathMatch: 'full' },
  // { path: '', redirectTo: 'prikborden', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadStrategy }
    )
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [SelectivePreloadStrategy]
})
export class AppRoutingModule { }
