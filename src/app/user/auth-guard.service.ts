import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authenticationService.user$.getValue()) {
      console.log(`the user logged in is: ${this.authenticationService.user$.getValue()}`)
      return true;
    }
    console.log('no user logged in');

    this.authenticationService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}