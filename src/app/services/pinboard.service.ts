import { Injectable } from '@angular/core';
import { PinBoard } from '../models/pin-board.model';
import { Location } from '../models/location.model';
import { Post } from '../models/post.model';

@Injectable()
export class PinboardService {
  private pinboards: PinBoard[];

  constructor() {
    let pinboardWithPosts = new PinBoard('Gent', new Location(4,6));
    pinboardWithPosts.addPost(new Post('Eerste Post!', 'Lorem ipsum naturrlijk'))
    pinboardWithPosts.addPost(new Post('Tweede titel zeg!', 'lorem ipsum twee natuurlijk'));
    this.pinboards = [
      pinboardWithPosts,
      new PinBoard('Oudenaarde', new Location(888.9, 789.2)),
      new PinBoard('Dendermonde', new Location(98, 99))
    ]

    
  }

  getByCityName(cityName: string): PinBoard {
    let foundPinboard = this.pinboards
      .find(pb => pb.city.trim().toLocaleLowerCase() === cityName.trim().toLocaleLowerCase());

    if (foundPinboard != undefined) {
      return foundPinboard;
    } else {
      throw new Error('Geen borden in deze stad!');
    }
  }

  getAll(): PinBoard[] {
    return this.pinboards;
  }

  addPinboard(pinboard: PinBoard) {
    this.pinboards.push(pinboard);
  }

}
