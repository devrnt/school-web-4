import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { Pinboard } from '../../models/pinboard.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PinboardService } from '../../services/pinboard.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @Input() pinboard: Pinboard;
  public newPost: FormGroup;
  public errorMsg: string;
  public errorMsgTitle: string;
  public errorMsgBody: string;


  succes: boolean;

  constructor(private formBuilder: FormBuilder, private _pinboardService: PinboardService) { }

  ngOnInit() {
    this.newPost = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required, Validators.minLength[10]]
    });


  }

  onSubmit() {
    let post_title = this.newPost.value.title;
    let post_body = this.newPost.value.body;
    if (this.newPost.valid) {
      let post = new Post(post_title, post_body);
      // this.pinboard.posts.push(post);
      this._pinboardService.addPostToPinboard(post, this.pinboard)
        .subscribe(
          // add the new post to the pinboard
          post => { 
            this.pinboard.addPost(post);
            this.newPost.reset();
            this.succes = true;
           },
          (error: HttpErrorResponse) => {
            this.errorMsg = `Error ${error.status} while adding post for ${
              this.pinboard.city
              }: ${error.error}`;
          }
        )
    } else {
      if(post_title === ''){
        this.errorMsgTitle = 'Titel is niet geldig';
      }
      if(post_body === ''){
        this.errorMsgBody = 'Body is niet geldig';
      }
    }

  }
}
