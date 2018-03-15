import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PinBoard } from '../../models/pin-board.model';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Input() pinBoard: PinBoard;
  constructor() { }

  ngOnInit() {
    console.log(this.pinBoard);
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

}
