import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';

import { catchError, map, tap, filter } from 'rxjs/operators';
import { Post } from '../models/post.model';


@Injectable()
export class AuthenticationService {

  private readonly _httpUrl = '/api/users';

  // Set the amount of minutes when a token should expire
  private readonly _minutes = 10;

  private readonly _tokenKey = 'currentUser';
  private readonly _likedPostsKey = 'likedPosts';


  private _user$: BehaviorSubject<any>;


  likedPosts: any;

  public redirectUrl: string;

  constructor(private http: HttpClient) {

    let parsedToken = this.parseJWT(localStorage.getItem(this._tokenKey));

    if (parsedToken) {
      const expiresFromToken = new Date(parseInt(parsedToken.exp, 10) * 1000);

      const max = new Date(expiresFromToken.getTime() + this._minutes * 60000);
      const expires = max < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        localStorage.removeItem(this._likedPostsKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<any>(parsedToken);

    let posts;
    if (parsedToken) {
      this._user$.subscribe(user => posts = user.likedPosts);
      localStorage.setItem(this._likedPostsKey, JSON.stringify(posts));
      console.log('van auth');
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._httpUrl}/login`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          let parsedToken = this.parseJWT(token);
          this._user$.next(parsedToken);
          let user;
          user = this._user$.subscribe(usr => user = usr.username);
          let posts;
          this._user$.subscribe(user => posts = user.likedPosts);
          localStorage.setItem(this._likedPostsKey, JSON.stringify(posts));
          this.likedPosts = this.getLikedPosts(user);
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

  likePost(postId: string): Observable<Post[]> {
    console.log('got from the like ' + postId);
    return this.http.post(`${this._httpUrl}/likePost`, { 'username': 'jonas', 'postId': postId }).pipe(
      map((list: any[]): Post[] =>
        list.map(Post.fromJSON)
      )
    )
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  get user$(): BehaviorSubject<any> {
    return this._user$;
  }

  getLikedPosts(username: string): Observable<Post[]> {
    let currentUser;
    this._user$.subscribe(user => currentUser = user.username);
    return this.http.post(`${this._httpUrl}/likedPosts`, { 'username': username }).pipe(
      map((list: any[]): Post[] =>
        list.map(Post.fromJSON)
      )
    )
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


