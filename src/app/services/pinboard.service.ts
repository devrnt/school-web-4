import { Injectable } from '@angular/core';
import { PinBoard } from '../models/pin-board.model';
import { Location } from '../models/location.model';

@Injectable()
export class PinboardService {
  private pinboards: PinBoard[];

  constructor() { 
    this.pinboards = [
      new PinBoard('Gent', new Location(4, 6)),
      new PinBoard('Oudenaarde', new Location(888.9, 789.2)),
      new PinBoard('Dendermonde', new Location(98, 99))
    ]
  }

  getPinboards():PinBoard[]{
    return this.pinboards;
  }

  addPinboard(pinboard: PinBoard){
    this.pinboards.push(pinboard);
  }

}
