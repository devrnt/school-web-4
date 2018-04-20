import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';

import { catchError, map, tap, filter } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {

  private readonly _httpUrl = '/api/users';

  // Set the amount of minutes when a token should expire
  private readonly _minutes = 10;

  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;


  constructor(private http: HttpClient) {

    let parsedToken = this.parseJWT(localStorage.getItem(this._tokenKey));

    if (parsedToken) {
      const expiresFromToken = new Date(parseInt(parsedToken.exp, 10) * 1000);

      const max = new Date(expiresFromToken.getTime() + this._minutes * 60000);
      const expires = max < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.username);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._httpUrl}/login`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._httpUrl}/register`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._httpUrl}/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  parseJWT(token) {
    if (!token) {
      return null;
    }
    const base64Token = token.split('.')[1];
    const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}


