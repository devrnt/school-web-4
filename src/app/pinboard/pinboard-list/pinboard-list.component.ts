import { Component, OnInit } from '@angular/core';
import { Pinboard } from '../../models/pinboard.model';
import { Post } from '../../models/post.model';
import { Location } from '../../models/location.model';
import { PinboardService } from '../../services/pinboard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pinboard-list',
  templateUrl: './pinboard-list.component.html',
  styleUrls: ['./pinboard-list.component.css']
})
export class PinboardListComponent implements OnInit {
  private _pinboards: Pinboard[];
  pinBoards: Observable<Pinboard[]>;

  constructor(private _pinboardService: PinboardService) {
  }

  ngOnInit() {
    this.pinBoards = this._pinboardService.getAllPinboards();
  }

  getPinBoards() {
    return this.pinBoards;
  }

}
