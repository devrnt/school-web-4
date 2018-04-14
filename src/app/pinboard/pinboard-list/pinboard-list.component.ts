import { Component, OnInit } from '@angular/core';
import { Pinboard } from '../../models/pinboard.model';
import { Post } from '../../models/post.model';
import { Location } from '../../models/location.model';
import { PinboardService } from '../../services/pinboard.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pinboard-list',
  templateUrl: './pinboard-list.component.html',
  styleUrls: ['./pinboard-list.component.css']
})
export class PinboardListComponent implements OnInit {

  public filterPinboardName: string;
  public filterPinboard$ = new Subject<string>();

  public errorMsg: string;

  private _pinboards: Pinboard[];

  constructor(private _pinboardService: PinboardService) {
    this.filterPinboard$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => this.filterPinboardName = val)
  }

  ngOnInit() {
    this._pinboardService.getAllPinboards()
      .subscribe(pinboards => (this._pinboards = pinboards),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
            } while trying to retrieve pinboards: ${error.error}`;
        }
      );
  }

  get pinboards() {
    return this._pinboards;
  }

  getPinboardByCityName(city: string): Observable<Pinboard> {
    return this._pinboardService.getPinboardFromCityName(city);
  }
}
