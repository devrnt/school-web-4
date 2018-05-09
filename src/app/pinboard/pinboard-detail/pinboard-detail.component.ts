import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Pinboard } from '../../models/pinboard.model';
import { PinboardService } from '../../services/pinboard.service';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/post.model';
import { AuthenticationService } from '../../services/authentication.service';



@Component({
  selector: 'app-pinboard-detail',
  templateUrl: './pinboard-detail.component.html',
  styleUrls: ['./pinboard-detail.component.css']
})
export class PinboardDetailComponent implements OnInit {
  private _pinboard: Pinboard;
  cityNameFromUrl: string;

  private _likedPosts: any;

  private readonly _likedPostsKey = 'likedPosts';

  public liked: boolean;


  constructor(private _route: ActivatedRoute,
    private _pinboardService: PinboardService,
    private _authenticationService: AuthenticationService) {
    localStorage.removeItem(this._likedPostsKey);

  }

  ngOnInit() {
    this.cityNameFromUrl = this._route.snapshot.paramMap.get('stad');
    this._route.data.subscribe(item => {
      this._pinboard = item['pinboard'];
    });
    let posts = [];
    this._authenticationService.getLikedPosts("jonas").subscribe(po => {
      let idArrayOfLikedPosts = po.map(pst => pst.id);
      localStorage.setItem(this._likedPostsKey, JSON.stringify(idArrayOfLikedPosts));

    });
  }

  get pinboard(): Pinboard {
    return this._pinboard;
  }

  likePost(postId: string) {
    // in prod check if user already has this post liked
    if (this.isPostLiked(postId)) {
      // dislike
      console.log('dislike this post')
    } else {
      console.log('like this post')
      this._authenticationService.likePost(postId).subscribe(likedPosts => this._likedPosts = likedPosts);

      let newPostArr = JSON.parse(localStorage.getItem(this._likedPostsKey));
      newPostArr.push(postId);

      localStorage.setItem(this._likedPostsKey, JSON.stringify(newPostArr));
      this.liked = true;

      // this._authenticationService.user$.subscribe(user => console.log('Hierphoi' + JSON.stringify(user)));
      // let posts = JSON.parse(localStorage.getItem('postIds'));
      // posts.push(postId);
      // console.log('jdidnidj' + posts);

      // service like the post  
      // increment amount of likes of post
    }
  }

  isPostLiked(postId: string): boolean {    
    return JSON.parse(localStorage.getItem(this._likedPostsKey)).includes(postId);
  }
}
