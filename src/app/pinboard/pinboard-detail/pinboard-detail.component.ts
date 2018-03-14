import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PinBoard } from '../../models/pin-board.model';
import { PinboardService } from '../../services/pinboard.service';


@Component({
  selector: 'app-pinboard-detail',
  templateUrl: './pinboard-detail.component.html',
  styleUrls: ['./pinboard-detail.component.css']
})
export class PinboardDetailComponent implements OnInit {
  pinBoard: PinBoard;
  cityNameFromUrl: string;
  constructor(private _route: ActivatedRoute, private _router: Router, private _pinboardService: PinboardService) {

  }

  ngOnInit() {
    this.cityNameFromUrl = this._route.snapshot.paramMap.get('stad');
    try {
      this.pinBoard = this._pinboardService.getByCityName(this.cityNameFromUrl);
    } catch (err) {
      console.error(err);
    }
  }
}
