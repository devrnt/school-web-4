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

  likedPost: string[];

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
    // temp
    this.writeLikesPostsInLocalStorage();
  }

  get pinboard(): Pinboard {
    return this._pinboard;
  }

  likePost(postId: string) {
    // in prod check if user already has this post liked
    if(this.isPostLiked(postId)){
      // onlike
    } else {
      // service like the post 
      // increment amount of likes of post
    }
  }

  // temp
  writeLikesPostsInLocalStorage() {
    let storage = window.localStorage;
    this.likedPost = ['5ad0727f728d885144e340af']
    storage.setItem('postIds', JSON.stringify(this.likedPost));
  }

  isPostLiked(postId: string): boolean {
    if (this.likedPost.find(data => data === postId)) {
      console.log(`Post ${postId} al geliked`);
      
      return true
    }
    console.log(`Post ${postId} niet geliked`);

    return false;
  }


}
