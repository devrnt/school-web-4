import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Pinboard } from '../../models/pinboard.model';
import { PinboardService } from '../../services/pinboard.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-pinboard-detail',
  templateUrl: './pinboard-detail.component.html',
  styleUrls: ['./pinboard-detail.component.css']
})
export class PinboardDetailComponent implements OnInit {
  private _pinboard: Pinboard;
  cityNameFromUrl: string;  

  constructor(private _route: ActivatedRoute, private _pinboardService: PinboardService) {
  }

  ngOnInit() {
    this.cityNameFromUrl = this._route.snapshot.paramMap.get('stad');
    try {
      this._pinboardService.getPinboardFromCityName(this.cityNameFromUrl)
        .subscribe(board => {
          this._pinboard = board;
        });
    } catch (err) {
      console.error(err);
    }
  }

  get pinboard():Pinboard {
    return this._pinboard;
  }
}
