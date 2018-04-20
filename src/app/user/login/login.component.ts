import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authenticationService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(val => {
        if (val) {
          if (this.authenticationService.redirectUrl) {
            this.router.navigateByUrl(this.authenticationService.redirectUrl);
            this.authenticationService.redirectUrl = undefined;
          } else {
            this.router.navigate(['/prikbord/alle']);
          }
        } else {
          this.errorMsg = `Could not login`;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.errorMsg = `Error while trying to login user ${
            this.user.value.username
          }: ${err.error.message}`;
        } else {
          this.errorMsg = `Error ${err.status} while trying to login user ${
            this.user.value.username 
          }: ${err.error}`;
          console.log(err.error)
        }
      }
    )
  }
}
