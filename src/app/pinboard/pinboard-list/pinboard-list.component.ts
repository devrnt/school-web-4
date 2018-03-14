import { Component, OnInit } from '@angular/core';
import { PinBoard } from '../../models/pin-board.model';
import { Post } from '../../models/post.model';
import { Location } from '../../models/location.model';
import { PinboardService } from '../../services/pinboard.service';

@Component({
  selector: 'app-pinboard-list',
  templateUrl: './pinboard-list.component.html',
  styleUrls: ['./pinboard-list.component.css']
})
export class PinboardListComponent implements OnInit {
  pinBoards: PinBoard[];
  
  constructor(private _pinboardService: PinboardService) {
  }

  ngOnInit() {
    this.pinBoards = this._pinboardService.getPinboards();
    // let newPost = new Post('First post!', 'Yeah this is def my first post on this pinboard!');
    // this.pinBoards[0].addPost(newPost);
    // this.posts = this.pinBoards[0].posts;
  }

}
