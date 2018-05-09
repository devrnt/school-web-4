import { Injectable } from '@angular/core';
import { Pinboard } from '../models/pinboard.model';
import { Location } from '../models/location.model';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';

import { catchError, map, tap, filter } from 'rxjs/operators';



@Injectable()
export class PinboardService {

  private readonly _httpUrl = '/api/';

  constructor(private http: HttpClient) { }

  getAllPinboards(): Observable<Pinboard[]> {
    return this.http.get(`${this._httpUrl}/pinboards`)
      .pipe(
        map((list: any[]): Pinboard[] =>
          list.map(Pinboard.fromJSON)
        )
      );
  }

  getPinboard(id: string): Observable<Pinboard> {
    return this.http
      .get(`${this._httpUrl}/pinboard/${id}`)
      .pipe(map(Pinboard.fromJSON));
  }

  addPostToPinboard(post: Post, pinboard: Pinboard): Observable<Post> {
    return this.http
      .post(`${this._httpUrl}/pinboard/${pinboard.id}/posts`, post)
      .pipe(map(Post.fromJSON));
  }

  addPinboard(pinboard: Pinboard): Observable<Pinboard> {
    return this.http
      .post(`${this._httpUrl}/pinboards/`, pinboard)
      .pipe(map(Pinboard.fromJSON))
  }

  getPinboardFromCityName(city: string): Observable<Pinboard> {
    return this.getAllPinboards()
      .map(pinboards => {
        let found = pinboards.filter(pin => pin.city.trim().toLocaleLowerCase() === city.trim().toLocaleLowerCase());
        return (found.length > 0) ? found[0] : null
      });
  }

  // This is not exactly a PinboardService method, 
  // but I keep it here for now








}
