import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post')
  public post: Post;

  private readonly _likedPostsKey = 'likedPosts';

  private liked: boolean;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  }


  likePost(postId: string) {
    // in prod check if user already has this post liked
    if (this.isPostLiked(postId)) {
      // dislike
      this._authenticationService.unlikePost(postId).subscribe(posts => console.log(posts));

      let newPostArr = JSON.parse(localStorage.getItem(this._likedPostsKey));
      newPostArr = newPostArr.filter(post => post !== postId)
      localStorage.setItem(this._likedPostsKey, JSON.stringify(newPostArr));
      this.liked = false;
      this.post.removeLike();
    } else {
      this._authenticationService.likePost(postId).subscribe(likedPosts => console.log(likedPosts));

      let newPostArr = JSON.parse(localStorage.getItem(this._likedPostsKey));
      newPostArr.push(postId);

      localStorage.setItem(this._likedPostsKey, JSON.stringify(newPostArr));
      this.liked = true;
      this.post.addLike();

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
