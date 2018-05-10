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
  }

  ngOnInit() {
    this.cityNameFromUrl = this._route.snapshot.paramMap.get('stad');
    this._route.data.subscribe(item => {
      this._pinboard = item['pinboard'];
    });
    // get username of currently logged in user
    const username = this._authenticationService.user$.getValue().username;

    this._authenticationService.getLikedPosts(username).subscribe(likedPosts => {
      // get the id's of the likedposts
      const dataForStorage = likedPosts.map(post => post.id);
      this.writeToLocalStorage(dataForStorage);
    });
  }

  get pinboard(): Pinboard {
    return this._pinboard;
  }

  writeToLocalStorage(likedPosts: any) {
    localStorage.removeItem(this._likedPostsKey);
    localStorage.setItem(this._likedPostsKey, JSON.stringify(likedPosts));
  }
}
