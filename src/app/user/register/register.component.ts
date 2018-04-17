import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';
import { AuthenticationService } from '../../services/authentication.service';

import { Observable } from 'rxjs/observable';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      passwordGroup: this.formBuilder.group(
        {
          password: ['', [Validators.required, this.passwordValidator(12)]],
          confirmPassword: ['', Validators.required]
        },
        { validator: this.comparePasswords }
      )
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService
        .checkUserNameAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        );
    };
  }

  onSubmit() {
    this.authenticationService
      .register(this.user.value.username, this.passwordControl.value)
      .subscribe(
        val => {
          if (val) {
            this.router.navigate(['/pinboards']);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
            } while trying to register user ${this.user.value.username}: ${
            error.error
            }`;
        }
      );
  }
  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }


  passwordValidator(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value.length < length
        ? {
          passwordTooShort: {
            requiredLength: length,
            actualLength: control.value.length
          }
        }
        : null;
    };
  }

  comparePasswords(control: AbstractControl): { [key: string]: any } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value
      ? null
      : { passwordsDiffer: true };
  }
}
