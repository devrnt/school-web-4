import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { Pinboard } from '../../models/pinboard.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Input() pinBoard: Pinboard;
  newPost: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newPost = this.formBuilder.group({
      title: ['title'],
      body: ['body']
    })
  }

  // recieves 2 DOM elements
  doSomething(title, body) {
    if (title.value === '' || body.value === '') {
      throw new Error('Velden mogen niet leeg zijn!');
    } else {
      let post = new Post(title.value, body.value);
      console.log(post);
      this.pinBoard.addPost(post)
      // this still needs to go to the database
      title.value = '';
      body.value = '';
    }

  }

  onSubmit() {
    // if (title.value === '' || body.value === '') {
    //   throw new Error('Velden mogen niet leeg zijn!');
    // } else {
    //   let post = new Post(title.value, body.value);
    //   console.log(post);
    //   this.pinBoard.addPost(post)
    //   // this still needs to go to the database
    //   title.value = '';
    //   body.value = '';
    // }
    let post_title = this.newPost.value.title;
    let post_body = this.newPost.value.body;


  }
}
