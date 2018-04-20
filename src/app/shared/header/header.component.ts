import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _currentUser: string;

  public dropDown: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user$.subscribe(user => this._currentUser = user);
  }

  ngOnInit() {
  }

  toggleMenu(): void {
    console.log('hey')
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    console.log($navbarBurgers);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    }

  }

  get currentUser(): string {
    return this._currentUser;
  }

  toggleDropDown() {
    this.dropDown = !this.dropDown;
  }

}
